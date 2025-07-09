import numpy as np
from PIL import Image
import io
import base64
import cv2

class ImageUtils:
    @staticmethod
    def read_image(file_bytes: bytes) -> np.ndarray:
        """
        Read raw bytes → RGB NumPy array.
        """
        pil_img = Image.open(io.BytesIO(file_bytes)).convert("RGB")
        return np.array(pil_img)

    @staticmethod
    def preprocess_for_model(image_np: np.ndarray, target_size=(256, 256)) -> np.ndarray:
        """
        Resize to target_size, normalize to [0,1], add batch dimension.
        """
        resized = cv2.resize(image_np, target_size)
        normalized = resized.astype(np.float32) / 255.0
        return np.expand_dims(normalized, axis=0)

    @staticmethod
    def encode_mask_to_base64(mask_np: np.ndarray) -> str:
        """
        Takes a 2D binary mask (0/1) → encodes to PNG → base64 string.
        """
        # Scale 0/1 → 0/255
        png_array = (mask_np * 255).astype(np.uint8)
        pil_img = Image.fromarray(png_array, mode="L")
        buf = io.BytesIO()
        pil_img.save(buf, format="PNG")
        return base64.b64encode(buf.getvalue()).decode("utf-8")
