# backend/app/api/routes/segmentation.py

import httpx
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.api.schemas.segmentation import PredictionResponse

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def proxy_predict(file: UploadFile = File(...)):
    """
    Accept multipart-form 'file', forward to the segmentation microservice,
    return JSON response back to the client.
    """
    contents = await file.read()

    async with httpx.AsyncClient() as client:
        files = {"file": (file.filename, contents, file.content_type)}
        resp = await client.post("http://segmentation:8001/predict", files=files)

    if resp.status_code != 200:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)

    return resp.json()
