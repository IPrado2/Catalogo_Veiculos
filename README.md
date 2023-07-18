
# Catálogo de Veículos

Este é um projeto de catálogo de veículos, desenvolvido com Django (API) no back-end e Angular (front-end) no front-end. O catálogo permite a listagem, edição e exclusão de veículos.

## Requisitos

- Python (versão 3.10.6)
- Node.js (versão 18.16.0)
- Angular CLI (versão 16.1.4)

## Configuração

1. Clone o repositório:

   ```shell
   git clone https://github.com/IPrado2/Catalogo_Veiculos.git

2. Configure o ambiente do back-end (Django):

  cd Django<br>
  python3 -m venv catalogo_veiculos
  source catalogo_veiculos/bin/activate
  pip3 install -r requirements.txt
  python3 manage.py migrate


3. Configure o frontend

   cd Angular
   npm install
   

## Execução

1. Inicie o servidor do back-end:

  cd Django
  source catalogo_veiculos/bin/activate
  python manage.py runserver

2. Inicie o servidor de desenvolvimento do front-end:

   cd Angular
   ng serve --open

3. Acesse o aplicativo em seu navegador:

   http://localhost:4200
   (O endereço de acesso pode mudar, verifique o console, o endereço será informado por lá)

