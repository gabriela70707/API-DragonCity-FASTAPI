from core.configs import settings
from sqlalchemy import Column, Integer, String

class DragonModel(settings.DBBaseModel):
    __tablename__ = "dragoes"

    id: int = Column(Integer(), primary_key=True, autoincrement=True)
    nome: str = Column(String(256))
    categoria: str = Column(String(256))
    raridade: str = Column(String(256))
    foto_ovo: str = Column(String(256)) 
    foto_bebe: str = Column(String(256)) 
    foto_adulto: str = Column(String(256)) 