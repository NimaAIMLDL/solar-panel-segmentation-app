from fastapi import APIRouter

from app.api.routes import segmentation

api_router = APIRouter()
api_router.include_router(segmentation.router, prefix="/segmentation", tags=["segmentation"])

