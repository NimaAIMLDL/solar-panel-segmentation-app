import numpy as np
import math
from ..config import settings

class PowerCalculator:
    def __init__(self):
        self.area_per_pixel = settings.AREA_PER_PIXEL
        self.irradiance = settings.GLOBAL_IRRADIANCE
        self.panel_area = settings.PANEL_LENGTH * settings.PANEL_WIDTH
        self.efficiency = settings.PANEL_EFFICIENCY
        self.pr = settings.PERFORMANCE_RATIO

    def calculate_from_mask(self, mask: np.ndarray) -> dict:
        """
        mask: 2D array of 0/1
        Returns panel_area, panel_count, total_power (kWp), annual_energy (kWh), average_hourly_power (kW)
        """
        pixel_count = int(np.sum(mask))
        panel_area = pixel_count * self.area_per_pixel
        panel_count = panel_area / self.panel_area if self.panel_area > 0 else 0

        # kWp = area [m^2] * (efficiency * 1000 W/m²) / 1000 = area * efficiency
        total_power = panel_area * self.efficiency

        # annual energy = kWp * global irradiance [Wh/m²/year] * PR
        annual_energy = (total_power * self.irradiance * self.pr) / 1000

        # average power (kW)
        average_hourly_power = annual_energy * 1000 / (365 * 24)

        return {
            "panel_area": round(panel_area, 3),
            "panel_count": math.ceil(panel_count),
            "total_power": round(total_power, 3),
            "annual_energy": round(annual_energy, 3),
            "average_hourly_power": round(average_hourly_power, 3),
        }
