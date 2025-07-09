import architectureImg from '@/assets/method.png'
import datasetImg from '@/assets/dataset.png'
import augmentationImg from '@/assets/augmentation.png'
import unetImg from '@/assets/u-net.png'
import TechStackSlider from '@/components/custom/tech-stack-slider'
import 'keen-slider/keen-slider.min.css'
import { Separator } from '@/components/ui/separator'

function ProjectInfoPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      {/* ─────── Page Title ─────── */}
      <h1 className="text-4xl md:text-2xl font-extrabold text-left">
        Semantic Segmentation of Photovoltaic Panels in Aerial Photography
      </h1>

      {/* ─────── Overview ─────── */}
      <div className="space-y-4 text-md text-justify leading-relaxed">
        <p>
          Renewable energy and decentralized energy producers play a key role in the energy transition. 
          As the share of solar power in the energy mix increases, the number of distributed 
          photovoltaic (PV) systems continues to grow. This poses new challenges for grid stability 
          due to fluctuating generation and the widespread distribution of installations.
        </p>
        <p>
          To address this, we apply computer vision and deep learning techniques to automatically detect 
          and segment photovoltaic panels in aerial imagery. The resulting segmentation maps enable the 
          estimation of various PV-related metrics, including total panel area, the number of installed 
          modules, system capacity and projected annual energy yield.
        </p>
      </div>

      {/* ─────── Architecture Image ─────── */}
      <section className="mt-12 mb-12 space-y-4 text-center">
        <img
          src={architectureImg}
          alt="Architecture"
          className="mx-auto rounded-md w-full max-w-[700px] h-auto object-contain shadow-sm"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">Methodology</p>
      </section>

      {/* ─────── Methodology ─────── */}
      <section className="space-y-10">
        {/* Dataset */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Methodology</h2>
          <div className="space-y-2 text-justify">
            <p className="font-bold">Dataset Creation</p>
            <p>
              We created a dataset of 274 aerial image patches and their corresponding segmentation 
              masks using Google Earth Pro. The dataset includes 160 images containing PV systems and 
              114 without any PV installations.
            </p>
          </div>
        </div>

        <section className="text-center mt-10 space-y-3">
          <img
            src={datasetImg}
            alt="Dataset Creation"
            className="mx-auto rounded-md w-full max-w-[400px] object-contain shadow"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dataset consists of aerial images and their masks as labels
          </p>
        </section>

        {/* Augmentation */}
        <div className="space-y-2 text-justify mt-10">
          <p className="font-bold">Data Augmentation</p>
          <p>
            To increase the robustness of the model, the original dataset was expanded to 1,096 images 
            using augmentation techniques such as rotation, flipping, shifting, brightness adjustments, 
            and zoom transformations.
          </p>
        </div>

        <section className="text-center mt-10 space-y-3">
          <img
            src={augmentationImg}
            alt="Image Augmentation"
            className="mx-auto rounded-md w-full max-w-[600px] object-contain shadow"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">Image augmentation examples</p>
        </section>

        {/* Model */}
        <div className="space-y-2 text-justify mt-10">
          <p className="font-bold">Deep Convolutional Neural Network</p>
          <p>
            We used a U-Net convolutional neural network for semantic segmentation. The architecture 
            consists of 24 convolutional layers, 4 max-pooling layers, 13 batch normalization layers, 
            and 4 skip connections that allow for high-resolution feature recovery.
          </p>
        </div>

        <section className="text-center mt-10 space-y-3">
          <img
            src={unetImg}
            alt="U-Net Architecture"
            className="mx-auto rounded-md w-full max-w-[700px] object-contain shadow"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            U-Net model architecture: 24 convolutional layers, 4 max-pool layers, 13 batch-normalization layers,
            and 4 skip-connections.
          </p>
        </section>

        {/* Training */}
        <div className="space-y-2 text-justify mt-10">
          <p className="font-bold">Training & Validation</p>
          <p>
            The model was trained on 1,096 augmented images and their corresponding masks over 
            5 epochs (3 hours and 54 minutes) using an NVIDIA GeForce 840M GPU. Evaluation on a 
            held-out test set (Schlaitdorf, Germany) showed a high detection rate: 53 out of 54 PV 
            systems were correctly identified (98.1% accuracy).
          </p>
        </div>

        {/* Estimation */}
        <div className="space-y-2 text-justify mt-10">
          <p className="font-bold">Post-Processing and PV Metrics Estimation</p>
          <p>
            After segmentation, OpenCV is used to analyze the predicted masks. The number of 
            segmented pixels is translated into real-world surface area, from which we estimate 
            the total number of PV modules, system power (in kWp), and annual energy yield. These 
            estimations are validated against official records from the German Federal Network 
            Agency (Bundesnetzagentur).
          </p>
        </div>
      </section>

      {/* ─────── GitHub Link ─────── */}
      <div className="space-y-2 mt-12">
        <p className="text-base">
          View the full implementation on{' '}
          <a
            href="https://github.com/NimaAIMLDL/solar-panel-segmentation-app"
            className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
           This work was developed as part of my research project at the Institute for Energy Economics 
           and Rational Energy Use (IER), University of Stuttgart.
        </p>
      </div>
      <TechStackSlider />
      {/* ─────── References Section ─────── */}
      <Separator className="my-6" />
      <div className="max-w-4xl mx-auto mt-8 text-[11px] text-gray-400 dark:text-gray-500 text-left leading-tight">
        <p className="font-semibold mb-1">References</p>

        <ul className="space-y-[2px] list-none">
          <li>
            Aerial imagery used in this project was obtained from:
            <br />
            &nbsp;&nbsp;- Google Earth © 2009 GeoBasis-DE/BKG
            <br />
            &nbsp;&nbsp;- Google Earth / Image © Landsat / Copernicus
          </li>

          <li>
            U-Net architecture based on:&nbsp;
            <a
              href="https://arxiv.org/abs/1505.04597"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 dark:hover:text-gray-300"
            >
              Ronneberger et al. (2015)
            </a>
          </li>

          <li>
            App Logo from open image source:&nbsp;
            <a
              href="https://bankinghub.de/innovation-digital/ki-im-auftragsmanagement"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 dark:hover:text-gray-300"
            >
              bankinghub.de
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProjectInfoPage
