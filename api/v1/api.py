from fastapi import APIRouter

from api.v1.endpoints import dragon_city

api_router = APIRouter()

api_router.include_router(dragon_city.router, prefix="/dragon", tags=["Dragoes"])

#api_router.include_router(cenarios.router, prefix="/cenarios", tags=["Cenários"])