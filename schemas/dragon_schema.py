from typing import Optional
from pydantic import BaseModel as SCBaseModel

class DragonSchema(SCBaseModel):

    id: Optional[int] = None
    nome: str
    categoria: str #fogo, agua, vento, etc...
    raridade: str #comum, raro ...

    class Config:
        orm_mode = True


class GetDragonSchema(DragonSchema):
    foto_ovo: str
    foto_bebe: str
    foto_adulto: str


    


#APRENDIZADOS
#esse arquivo está definindo como os dados serão recebidos pelo método POST ou retornados pela API
'''
o schema seria mais para o controle do que é recebido ou retornado para o cliente ja o model é para configurar aquilo que 
ficara armazenado no banco de dados

por exemplo eu posso vim aqui e criar 
from typing import Optional
from pydantic import BaseModel

class DragonCreateSchema(BaseModel):
    nome: str
    categoria: str
    evolucao: str
    raridade: str

    class Config:
        orm_mode = True

class DragonGetSchema(DragonCreateSchema):
    id: int
    foto: Optional[str]  # O caminho da foto será retornado aqui

e no  meu codigo colocar 
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=DragonGetSchema)
async def post_dragon(dragon: DragonCreateSchema, db: AsyncSession = Depends(get_session)):
    novo_dragon = DragonModel(
        nome=dragon.nome,
        categoria=dragon.categoria,
        evolucao=dragon.evolucao,
        raridade=dragon.raridade,
    )
    db.add(novo_dragon)
    await db.commit()
    return novo_dragon

@router.get("/", response_model=List[DragonGetSchema])
async def get_dragoes(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(DragonModel)
        result = await session.execute(query)
        dragoes = result.scalars().all()
        return dragoes
assim consigo ter um certo contorle do que esta sendo enviado para o cliente e o que ele esta enviando para cá
'''


'''
Model: É usado para definir a estrutura que será armazenada no banco de dados. No seu caso, o DragonModel 
representa os campos e as regras para como os dados do dragão serão salvos, como id, nome, categoria, evolucao, raridade e foto. 
Ele é diretamente ligado ao banco de dados, funcionando como um "mapa" para as tabelas.

Schema: É mais voltado para controle do que o cliente pode enviar (entrada) ou receber (saída). Ele ajuda a validar os 
dados recebidos no corpo das requisições e também a formatar os dados devolvidos nas respostas. Os schemas permitem criar 
diferentes representações dos dados para se ajustar às necessidades específicas de cada endpoint.

Resumindo:

Model: Configura como e o que será armazenado no banco de dados.

Schema: Define como e o que será recebido ou retornado entre cliente e servidor.
'''

#Anotações importantes em relação ao Schema:
'''
Se você não criar um schema para o POST, o método ainda vai funcionar, pois o FastAPI utiliza os parâmetros diretamente para criar o dragão. 
No entanto, sem um schema, você perde algumas vantagens importantes que o schema oferece, principalmente na validação de dados.

O que acontece sem um schema no POST?
Dados não validados:

Sem o schema, o FastAPI aceita qualquer dado enviado pelo cliente, mesmo que esteja incompleto ou mal formatado (ex.: strings vazias, tipos errados, etc.).

Isso pode causar erros no banco de dados ou comportamentos inesperados na sua aplicação.

Menos segurança:

Imagine que um cliente envie dados além do esperado (ex.: um campo que não deveria estar ali ou com valores estranhos). 
Sem validação, esses dados podem ser processados de forma incorreta.

Menos clareza:

O schema serve como documentação automática para os endpoints. Sem ele, outros desenvolvedores ou usuários da API não conseguem 
visualizar exatamente quais dados são esperados no POST.

Com um schema no POST:
Validação automática:

Garante que os dados enviados pelo cliente têm os tipos corretos e estão dentro dos limites definidos (ex.: evitar uma string 
gigantesca ou valores incorretos).

Respostas claras para o cliente:

Se o cliente enviar um dado inválido, o FastAPI retorna uma mensagem de erro explicando o problema, antes mesmo de chegar ao banco de dados.

Documentação gerada automaticamente:

O schema aparece na interface da documentação automática do FastAPI (Swagger UI), mostrando ao cliente exatamente quais campos são esperados e seus tipos.

Resumo prático:
Sem um schema: O método funciona, mas você perde validação e a segurança que o FastAPI pode oferecer.

Com um schema: Você tem controle total sobre os dados, evita erros e melhora a experiência do cliente ao usar a API.
'''
