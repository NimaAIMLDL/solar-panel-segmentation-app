from fastapi import FastAPI, File, UploadFile
from starlette.middleware.cors import CORSMiddleware
import asyncio
from .services.predictor import PredictorService
from .schemas import PredictionResponse

predictor_service = PredictorService()

app = FastAPI(
    title="PV Segmentation Microservice",
    version="1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict", response_model=PredictionResponse)
async def predict_pv(
        file: UploadFile = File(...)):
    """
    Upload an aerial image (JPEG/PNG) under form-data field 'file'.
    Returns segmentation mask + PV metrics.
    """
    contents = await file.read()
    
    loop = asyncio.get_running_loop()
    result = await loop.run_in_executor(
        None, predictor_service.predict_from_bytes, contents
    )
    return PredictionResponse(**result)
