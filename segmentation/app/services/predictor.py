import numpy as np
from fastapi import UploadFile, HTTPException
from ..models.unet_model import UNetModel
from ..utils.image_utils import ImageUtils
from ..services.calculator import PowerCalculator
from ..config import settings

class PredictorService:
    def __init__(self):
        # Load U-Net once at startup
        self.model = UNetModel(weights_path=settings.MODEL_WEIGHTS_PATH)
        self.calculator = PowerCalculator()

    async def predict_from_upload(self, file: UploadFile) -> dict:
        """
        1) Read bytes → RGB numpy
        2) Preprocess → run model → get binary mask
        3) Count pixels → run power calculation
        4) Return everything plus base64 mask
        """
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image.")

        contents = await file.read()
        image_np = ImageUtils.read_image(contents)
        preprocessed = ImageUtils.preprocess_for_model(image_np)
        mask = self.model.predict(preprocessed)

        calc = self.calculator.calculate_from_mask(mask)

        mask_b64 = ImageUtils.encode_mask_to_base64(mask)
        return {
            "panel_area": calc["panel_area"],
            "panel_count": calc["panel_count"],
            "total_power_kwp": calc["total_power"],
            "annual_energy_mwh": calc["annual_energy"],
            "average_hourly_power_kw": calc["average_hourly_power"],
            "segmentation_mask": mask_b64
        }
    
    def predict_from_bytes(self, contents: bytes) -> dict:
        """
        1) Read bytes → RGB numpy
        2) Preprocess → run model → get binary mask
        3) Count pixels → run power calculation
        4) Return everything plus base64 mask
        """
        image_np = ImageUtils.read_image(contents)
        preprocessed = ImageUtils.preprocess_for_model(image_np)
        mask = self.model.predict(preprocessed)

        calc = self.calculator.calculate_from_mask(mask)
        mask_b64 = ImageUtils.encode_mask_to_base64(mask)

        return {
            "panel_area": calc["panel_area"],
            "panel_count": calc["panel_count"],
            "total_power_kwp": calc["total_power"],
            "annual_energy_mwh": calc["annual_energy"],
            "average_hourly_power_kw": calc["average_hourly_power"],
            "segmentation_mask": mask_b64,
        }
