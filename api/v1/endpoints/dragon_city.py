from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, Response

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from models.dragon_city_model import DragonModel
from schemas.dragon_schema import DragonSchema
from core.deps import get_session

router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=DragonSchema)
async def post_dragon(dragon: DragonSchema, db: AsyncSession = Depends(get_session)):
    novo_dragon = DragonModel(nome=dragon.nome, categoria=dragon.categoria, 
                               evolucao=dragon.evolucao,
                               raridade=dragon.raridade, foto=dragon.foto)
    
    db.add(novo_dragon)
    await db.commit()
    return novo_dragon

@router.get("/", response_model=List[DragonSchema])
async def get_dragoes(db:AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(DragonModel)
        result = await session.execute(query)
        dragoes: List[DragonModel] = result.scalars().all()

        return dragoes
    
@router.get("/{dragon_id}", response_model=DragonSchema)
async def get_dragon(dragon_id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(DragonModel).filter(DragonModel.id == dragon_id)
        result = await session.execute(query)
        dragon = result.scalar_one_or_none()

        if dragon:
            return dragon
        else:
            raise HTTPException(detail="Dragão não encontrado", 
                                status_code=status.HTTP_404_NOT_FOUND)

@router.put("/{dragon_id}", response_model=DragonSchema, status_code=status.HTTP_202_ACCEPTED)
async def put_dragon(dragon_id: int, dragon: DragonSchema, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(DragonModel).filter(DragonModel.id == dragon_id)
        result = await session.execute(query)
        dragon_up = result.scalar_one_or_none()

        if dragon_up:
            dragon_up.nome = dragon.nome
            dragon_up.categoria = dragon.categoria
            dragon_up.evolucao = dragon.evolucao
            dragon_up.raridade = dragon.raridade
            dragon_up.foto = dragon.foto

            await session.commit()
            return dragon_up

        else:
            raise HTTPException(detail="Dragão não encontrado", 
                                status_code=status.HTTP_404_NOT_FOUND)
        
@router.delete("/{dragon_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_dragon(dragon_id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(DragonModel).filter(DragonModel.id == dragon_id)
        result = await session.execute(query)
        dragon_del = result.scalar_one_or_none()

        if dragon_del:
            await session.delete(dragon_del)
            await session.commit()
            return Response(status_code=status.HTTP_204_NO_CONTENT)
        else:
            raise HTTPException(detail="Dragão não encontrado", 
                                status_code=status.HTTP_404_NOT_FOUND)








