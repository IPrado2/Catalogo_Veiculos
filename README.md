
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
<br>

2. Configure o ambiente do back-end (Django):

   ```shell
     cd Django
     python3 -m venv catalogo_veiculos
     source catalogo_veiculos/bin/activate
     pip3 install -r requirements.txt
     python3 manage.py migrate
<br>

3. Configure o ambiente do front-end (Angular):

      ```shell
      cd Angular
      npm install
 <br>  

## Execução

1. Inicie o servidor do back-end:

      ```shell
     cd Django
     source catalogo_veiculos/bin/activate
     python manage.py runserver
<br>

3. Inicie o servidor de desenvolvimento do front-end:

      ```shell
      cd Angular
      ng serve --open
<br>

4. Acesse o aplicativo em seu navegador:

   ```shell
   http://localhost:4200

(O endereço de acesso pode mudar, verifique o console, o endereço será informado por lá)

