from pydantic import BaseSettings

class Settings(BaseSettings):
    # Path to pretrained U-Net weights (inside the container)
    MODEL_WEIGHTS_PATH: str = "./model_weights/unet_5x_226Aug904.hdf5"

    # Threshold for binary mask (unused if model already outputs 0/1)
    PIXEL_THRESHOLD: int = 155

    # Physical constants
    GLOBAL_IRRADIANCE: float = 1025.0  # [W/m²] average for Stuttgart
    AREA_PER_PIXEL: float = 0.087 * 0.087  # [m²] area per segmented pixel
    PANEL_LENGTH: float = 1.651  # [m]
    PANEL_WIDTH: float = 0.9906  # [m]
    PANEL_EFFICIENCY: float = 0.15  # 15%
    PERFORMANCE_RATIO: float = 0.75  # PR

    class Config:
        env_file = "../env.dev"
        env_file_encoding = "utf-8"

settings = Settings()
