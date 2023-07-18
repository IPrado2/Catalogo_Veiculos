
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

2. Configure o ambiente do back-end (Django):<br>
   (Em alguns casos é necessário utilizar 'python3' e 'pip3', dependendo da versão do seu python e do sistema operacional)<br>

   ```shell
     cd Django
     python -m venv catalogo_veiculos
   ```  
  
Os passos a seguir dependem da versão do seu sistema operacional:<br>

LINUX:<br>

   ```shell
     source catalogo_veiculos/bin/activate
   ```
<br>
WINDOWS:<br>
   . POWERSHELL (ADMIN):<br>
      
      Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
      .\catalogo_veiculos\Scripts\Activate.ps1
      


      pip install -r requirements.txt
      cd Catalogo_v\
      python manage.py migrate
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

