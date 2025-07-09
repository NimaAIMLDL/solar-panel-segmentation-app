import React, { useState, useRef, ChangeEvent, FormEvent } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Separator } from '@/components/ui/separator'
import {
  ImageIcon,
  PanelTopCloseIcon,
  BoltIcon,
  CalendarIcon,
  Clock3Icon,
  UploadIcon,
  PlayIcon,
  Loader2,
} from 'lucide-react'

interface PredictionResult {
  panel_area: number
  panel_count: number
  total_power_kwp: number
  annual_energy_mwh: number
  average_hourly_power_kw: number
  segmentation_mask: string
}

const SegmentationCard: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const { toast } = useToast()

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleNewFile(file)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleNewFile(file)
  }

  const handleNewFile = (file: File) => {
    setSelectedFile(file)
    setResult(null)
    setPreviewSrc(null)

    const reader = new FileReader()
    reader.onloadend = () => setPreviewSrc(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please choose an image to upload.',
      })
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiBase}/api/v1/segmentation/predict`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error(await response.text())
      const data: PredictionResult = await response.json()
      setResult(data)
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Upload error',
        description: err.message || 'Something went wrong.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">PV Segmentation</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Upload Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <p className="text-sm text-gray-700 dark:text-gray-300">Upload an aerial image</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            You can download example aerial images from GitHub.&nbsp;
            <a
              href="https://github.com/NimaAIMLDL/solar-panel-segmentation-app/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800"
            >
              Click here to download test images
            </a>
          </p>

            {/* Upload Button Box */}
            <div 
              className={`
                mt-3 border-2 border-dashed rounded-md p-6 text-center transition
                ${isDragging ? 'border-teal-600 bg-teal-50 dark:bg-teal-900' : 'border-gray-300 dark:border-gray-600'}
              `}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
                className="hidden"
                ref={fileInputRef}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer inline-flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 hover:underline"
              >
                <UploadIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">Click or drag an image here</span>
              </div>

              {selectedFile && (
                <p className="text-sm mt-2 text-gray-600">{selectedFile.name}</p>
              )}
            </div>
          </div>

          {/* Image Preview */}
          {previewSrc && (
            <div className="flex justify-center">
              <img
                src={previewSrc}
                alt="Preview"
                className="h-48 object-contain border rounded"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <div
              className={`
                group
                border border-gray-400 rounded-md px-4 py-2
                cursor-pointer transition duration-150
                hover:border-gray-600 hover:shadow-md
                flex items-center gap-2
                ${loading ? 'bg-gray-100' : 'bg-white'}
              `}
              onClick={handleSubmit}
              tabIndex={0}
              role="button"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  <span className="text-sm font-medium text-gray-500">Processing…</span>
                </>
              ) : (
                <>
                  <PlayIcon className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Run Segmentation</span>
                </>
              )}
            </div>
          </div>
        </form>

        {/* Results */}
        {result && (
          <>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h3 className="text-sm font-semibold mb-2">Original</h3>
                <img
                  src={previewSrc!}
                  alt="Original"
                  className="w-full max-w-sm mx-auto border rounded"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold mb-2">Segmentation Mask</h3>
                <img
                  src={`data:image/png;base64,${result.segmentation_mask}`}
                  alt="Segmentation Mask"
                  className="w-full max-w-sm mx-auto border rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <MetricCard label="PV Area (m²)" value={result.panel_area} icon={<ImageIcon size={18} />} />
              <MetricCard label="Panel Count" value={result.panel_count} icon={<PanelTopCloseIcon size={18} />} />
              <MetricCard label="Total Power (kWp)" value={result.total_power_kwp.toFixed(3)} icon={<BoltIcon size={18} />} />
              <MetricCard label="Annual Energy (MWh)" value={result.annual_energy_mwh.toFixed(3)} icon={<CalendarIcon size={18} />} />
              <MetricCard
                label="Avg Hourly Power (kW)"
                value={result.average_hourly_power_kw.toFixed(3)}
                icon={<Clock3Icon size={18} />}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

const MetricCard = ({
  label,
  value,
  icon,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
}) => (
  <div className="bg-gray-100 rounded-md p-4 text-center shadow-sm">
    <div className="flex justify-center items-center mb-2 text-gray-500">{icon}</div>
    <div className="text-sm font-medium text-gray-600">{label}</div>
    <div className="text-xl font-bold text-gray-800">{value}</div>
  </div>
)

export default SegmentationCard
