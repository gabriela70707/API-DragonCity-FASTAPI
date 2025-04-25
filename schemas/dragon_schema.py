from typing import Optional
from pydantic import BaseModel as SCBaseModel

class DragonSchema(SCBaseModel):

    id: Optional[int] = None
    nome: str
    categoria: str #fogo, agua, vento, etc...
    evolucao: str #bebe, jovem, adulto...
    raridade: str #comum, raro ...
    foto: str

    class Config:
        orm_mode = True