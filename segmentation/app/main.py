from fastapi import FastAPI, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware

from .services.predictor import PredictorService
from .schemas import PredictionResponse
from .core.config import settings

app = FastAPI(
    title="PV Segmentation Microservice",
    version="1.0"
)

# Apply proper CORS settings
if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

def get_predictor_service():
    return PredictorService()

@app.post("/predict", response_model=PredictionResponse)
async def predict_pv(
    file: UploadFile = File(...),
    service: PredictorService = Depends(get_predictor_service)
):
    """
    Upload an aerial image (JPEG/PNG) under form-data field 'file'.
    Returns segmentation mask + PV metrics.
    """
    result = await service.predict_from_upload(file)
    return PredictionResponse(**result)
