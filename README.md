**Feito por: Charles Nilton do Nascimento; Harley Moura, e; Pedro Henrique Pereira Gonçalves.
ADS -Noturno 4º CICLO**

# Projeto Pizzaria 

Este é um sistema para gerenciar pizzas, feito com React (frontend) e Laravel (backend).

## Como Rodar o Projeto

Para que o professor possa testar, siga estes passos:

### 1. No Terminal (linha de comando)

Primeiro, baixe o projeto para o seu computador:

```bash
git clone [https://github.com/CHARLES1650/ProjetoPizzaria.git](https://github.com/CHARLES1650/ProjetoPizzaria.git)
cd ProjetoPizzaria
2. Para Iniciar a Parte do Servidor (Laravel - Backend)
Abra um terminal e vá para a pasta 'pizzaria-api':

Bash

cd pizzaria-api
Instale o que o Laravel precisa:

Bash

composer install
Crie o arquivo de configurações e uma chave de segurança:

Bash

cp .env.example .env
php artisan key:generate
Importante: Você precisa ter um banco de dados MySQL chamado crud_pizzaria_db (ou o nome que você usou) configurado e conectado no seu arquivo .env do Laravel.

Crie as tabelas no banco de dados:

Bash

php artisan migrate
Inicie o servidor do Laravel (backend):

Bash

php artisan serve
Ele deve aparecer em http://127.0.0.1:8000. Deixe este terminal aberto.

3. Para Iniciar a Parte do Aplicativo (React - Frontend)
Abra um NOVO terminal (não feche o anterior) e vá para a pasta 'pizzaria-frontend':

Bash

cd ..
cd pizzaria-frontend
Instale o que o React precisa:

Bash

npm install
Inicie o aplicativo React (frontend):

Bash

npm start
Ele deve abrir no seu navegador em http://localhost:3000.



