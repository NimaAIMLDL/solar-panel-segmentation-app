import { createFileRoute } from '@tanstack/react-router';
import SegmentationCard from '@/components/charts/SegmentationCard';

export const Route = createFileRoute('/_layout/segmentation')({
  component: SegmentationPage,
});

function SegmentationPage() {
  return (
    <div className="py-8 px-4 md:px-8 lg:px-16">
      <SegmentationCard />
    </div>
  );
}

export default SegmentationPage;
