
# Catálogo de Veículos

Este é um projeto de catálogo de veículos, desenvolvido com Django (API) no back-end e Angular (front-end) no front-end. O catálogo permite a listagem, criação, edição e exclusão de veículos.

## Tecnologias Utilizadas
A seguir, estão as principais tecnologias e linguagens utilizadas para o desenvolvimento deste projeto:

- Linguagens: Django, Angular. 
- Banco de Dados: SQLite.

## Requisitos

- Python (versão 3.10.6)
- Node.js (versão 18.16.0)
- Angular CLI (versão 16.1.4)

## Configuração e Execução

1. Clone o repositório:

   ```shell
   git clone https://github.com/IPrado2/Catalogo_Veiculos.git
<br>

2. Configure o ambiente do back-end (Django):<br>
   (Em alguns casos é necessário utilizar 'python3' e 'pip3', dependendo da versão do seu python e do sistema operacional)<br>

      ```shell
     cd Django
     python -m venv catalogo_veiculos

      LINUX:
            source catalogo_veiculos/bin/activate

      WINDOWS (POWERSHELL - ADMIN):
            Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
            .\catalogo_veiculos\Scripts\Activate.ps1

      pip install -r requirements.txt
      cd Catalogo_v\
      python manage.py migrate
      python manage.py runserver
      ```
<br>

3. Configure o ambiente do front-end (Angular):

      ```shell
      cd Angular
      npm install
      ng serve --open
 <br>  

4. Acesse o aplicativo em seu navegador:

   ```shell
   http://localhost:4200
   ```
(O endereço de acesso pode mudar, verifique o console, o endereço será informado por lá)<br>

   <br>

## Funcionamento   
   <br>
1. Página Home<br><br>
   A página inicial (Home) é a vitrine dos veículos disponíveis no sistema. As principais funcionalidades são:<br>
<br>
1.1 Listagem de Veículos: Todos os veículos são exibidos em uma lista, organizada por ordem de valor, do mais barato ao mais caro. Cada item da lista apresenta informações como marca, modelo, ano, cor e valor.<br><br>

1.2 Filtros por Marca e Modelo: A página oferece filtros que permitem ao usuário pesquisar veículos específicos por marca e modelo. Isso torna a experiência do usuário mais amigável e facilita a busca por veículos desejados.<br>

## Painel de Administração
<br>
2. O Painel de Administração é uma área restrita e protegida do sistema que só pode ser acessada após o login com as credenciais a seguir:<br><br>
- Login: root<br>
- Senha: root<br>
<br><br>
Dentro do Painel de Administração, o usuário possui as seguintes funcionalidades:<br><br>

2.1 Cadastro de Marca: Permite adicionar novas marcas ao sistema. Ao cadastrar uma nova marca, ela estará disponível para associar a diferentes modelos.<br>

2.2 Cadastro de Modelo: Permite adicionar novos modelos associados às marcas já cadastradas. Ter modelos separados facilita a organização e busca dos veículos.<br>

2.3 Cadastro de Veículo: Oferece a possibilidade de inserir novos veículos no sistema. Cada veículo cadastrado pode ter uma marca, modelo, ano, cor e valor específicos.<br>

2.4 Edição de Marca, Modelo e Veículo: Permite que o usuário realize alterações nos dados das marcas, modelos e veículos já existentes no sistema.<br>

2.5 Exclusão de Marca, Modelo e Veículo: Dá a opção de remover marcas, modelos ou veículos que não sejam mais relevantes ou estejam incorretos.<br>


## Contato
Caso tenha alguma dúvida, sugestão ou queira entrar em contato, sinta-se à vontade para enviar um e-mail para igorprado022@gmail.com.<br><br>

Espero que este projeto seja útil e ajude a aprimorar seus conhecimentos em desenvolvimento web! Obrigado por utilizar esta aplicação.<br>

