import httpx
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.api.schemas.segmentation import PredictionResponse
from app.core.config import settings

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def proxy_predict(file: UploadFile = File(...)):
    contents = await file.read()
    base = str(settings.SEGMENTATION_URL).rstrip("/")
    target = f"{base}/predict"

    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(
            target,
            files={"file": (file.filename, contents, file.content_type)},
        )

    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)

    return resp.json()
