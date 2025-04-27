from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, Response, UploadFile, File
#import para a importação de fotos
import shutil
'''
No contexto do projeto, usamos shutil.copyfileobj para copiar o conteúdo do arquivo enviado pelo cliente (o upload) 
para o local onde ele será armazenado no servidor. no caso a pasta media
'''

#instalei essa biblioteca pip install python-multipart:
#No caso do FastAPI, a biblioteca é necessária para processar os arquivos enviados pelo cliente 
#(como fotos) e garantir que o endpoint possa manipular corretamente o conteúdo recebido, como os UploadFile.

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

# essa importação é para facilitar a seleção da fase no upload das imagens
from enum import Enum

from models.dragon_city_model import DragonModel
from schemas.dragon_schema import DragonSchema, GetDragonSchema
from core.deps import get_session

import os  # Necessário para manipular diretórios, é usado pois há uma validação que ve se os diretorios de fases(ovo,bebe,adulto)
#existe caso nao exista ele cria essa pasta evitando erros 

router = APIRouter()

#implementando o import de fotos 
class FaseDragao(str, Enum):
    ovo = "ovo"
    bebe = "bebe"
    adulto = "adulto"

@router.post("/upload-foto/{dragon_id}")
async def upload_foto(
    dragon_id: int, 
    fase: FaseDragao, 
    foto: UploadFile = File(...), 
    db: AsyncSession = Depends(get_session)
):
    # Valida o tipo de arquivo
    if foto.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Apenas arquivos JPEG ou PNG são permitidos.")
    
    # Cria o diretório, se necessário
    diretorio_fase = f"media/{fase.value}"
    os.makedirs(diretorio_fase, exist_ok=True)
    
    # Define o caminho e salva o arquivo
    caminho_arquivo = f"{diretorio_fase}/{dragon_id}_{foto.filename}"
    try:
        with open(caminho_arquivo, "wb") as buffer:
            shutil.copyfileobj(foto.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao salvar arquivo: {str(e)}")
    
    # Gera a URL completa
    url_completa = f"http://localhost:8000/{caminho_arquivo}"

    # Atualiza no banco de dados
    async with db as session:
        # Verifica se o dragão existe
        query = select(DragonModel).filter(DragonModel.id == dragon_id)
        result = await session.execute(query)
        dragon = result.scalar_one_or_none()
        
        if not dragon:
            raise HTTPException(status_code=404, detail="Dragão não encontrado")
        
        # Atualiza o campo correspondente
        if fase == FaseDragao.ovo:
            dragon.foto_ovo = url_completa
        elif fase == FaseDragao.bebe:
            dragon.foto_bebe = url_completa
        elif fase == FaseDragao.adulto:
            dragon.foto_adulto = url_completa
        
        # Salva as alterações
        await session.commit()

    return {"mensagem": f"Foto da fase {fase.value} enviada com sucesso!", "caminho": url_completa}



@router.post("/", status_code=status.HTTP_201_CREATED, response_model=DragonSchema)
async def post_dragon(dragon: DragonSchema, db: AsyncSession = Depends(get_session)):
    novo_dragon = DragonModel(nome=dragon.nome, categoria=dragon.categoria, 
                               raridade=dragon.raridade)
    
    db.add(novo_dragon)
    await db.commit()
    return novo_dragon

@router.get("/", response_model=List[GetDragonSchema])
async def get_dragoes(db:AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(DragonModel)
        result = await session.execute(query)
        dragoes: List[DragonModel] = result.scalars().all()

        return dragoes
    
@router.get("/{dragon_id}", response_model=GetDragonSchema)
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
            dragon_up.raridade = dragon.raridade


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








