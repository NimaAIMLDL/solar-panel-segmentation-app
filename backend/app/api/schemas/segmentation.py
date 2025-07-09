from pydantic import BaseModel
from typing import Optional

class PredictionResponse(BaseModel):
    panel_area: int
    panel_count: int
    total_power_kwp: float
    annual_energy_mwh: float
    average_hourly_power_kw: float
    segmentation_mask: Optional[str]
