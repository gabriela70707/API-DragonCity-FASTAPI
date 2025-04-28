from core.configs import settings
from core.database import engine
from models import all_models

async def create_table() -> None:
    print("Criando as tabelas do banco de dados")

    async with engine.begin() as conn:
        await conn.run_sync(settings.DBBaseModel.metadata.drop_all)

        await conn.run_sync(settings.DBBaseModel.metadata.create_all)

    print("Tabelas criadas com sucesso")

if __name__ == "__main__":
    import asyncio
    asyncio.run(create_table())

'''
async def create_table: Define uma função assíncrona que realiza as operações no banco.

print("Criando as tabelas..."): Apenas uma mensagem de log informando que o processo de criação/recriação está começando.

async with engine.begin() as conn:

Abre uma conexão com o banco de dados usando o motor (engine) do SQLAlchemy.

O begin() é usado para criar uma transação, ou seja, uma sessão segura para executar as operações no banco.

await conn.run_sync(settings.DBBaseModel.metadata.drop_all):

Usa o SQLAlchemy para remover todas as tabelas existentes no banco, baseado nos modelos definidos.

Isso é útil para "resetar" o banco, garantindo que quaisquer alterações nos modelos sejam aplicadas corretamente.

await conn.run_sync(settings.DBBaseModel.metadata.create_all):

Cria todas as tabelas no banco de dados com base nos modelos definidos em settings.DBBaseModel.

print("Tabelas criadas com sucesso"): Log final informando que as tabelas foram criadas/recriadas sem problemas.

'''