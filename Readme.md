# Documentação do Projeto: Consulta de Endereços com ViaCEP

## Visão Geral

Este projeto permite a consulta de endereços brasileiros a partir de um CEP (Código de Endereçamento Postal) utilizando a API ViaCEP. A API ViaCEP é um serviço gratuito que fornece informações de endereços a partir de CEPs, facilitando a integração com sistemas que necessitam de dados geográficos brasileiros.

## Funcionalidades

- Consulta de endereço completo a partir de um CEP.
- Validação e formatação de CEPs.
- Integração simples com outras aplicações.

## Tecnologias Utilizadas

- Linguagem de Programação: JavaScript
- Linguagem de Marcação: HTML
- Estilização: CSS
- API: ViaCEP (https://viacep.com.br/)

## Como Funciona a API ViaCEP

- Ponto de entrada : é o endereço do serviço hospedado e que pode ser acessado atraves de um navegador ou uma ferramenta de consumo de API s.
Exemplo: <https://dadosabertos.camara.leg.br/api/v2>


- ** Recurso**: sao os serviços de dados disponiveis para consumo .
Exemplo: <https://dadosabertos.camara.leg.br/api/v2/deputados>


- ** Parametros**:sao informaçoes ou filtros que servem para enviar dados da consulta
ou para serem processados pela API. Os parametros podem ser passados para a API atraves da URL ou no
corpo (body) da requisição.
Exemplo: <https://dadosabertos.camara.leg.br/api/v2/deputados?nome=tiririca>


- **Metodos**: sao as formas de consumo de uma API, que podem ser:
- _POST_ : inserção de dados(**C**REATE)
- _GET_: obtencao de dados (**R**EAD) 
- _PUT_ e _PATCH_:atualizAçao (**U**PDATE)
- _DELETE_:remoçao de daods (**D**ELETE)

## Instalação

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/EricSouzaDosSantos/Consulta-de-CEP.git
```


### Passo 2: Instalar Dependências

#### JavaScript (exemplo):

``` javscript

const axios = require('axios');

async function consultaCep(cep) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        console.log(response.data);
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
    }
}

const cep = '01001000';
consultaCep(cep);
```

#### HTML (exemplo):
```HTML
<form id="cepForm">
    <label for="cep">CEP:</label>
    <input type="text" id="cep" name="cep" required>
    <button type="submit">Consultar</button>
</form>

<p id="resultado"></p>

<script>
    document.getElementById('cepForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const cep = document.getElementById('cep').value;
        consultaCep(cep);
    });

    async function consultaCep(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            document.getElementById('resultado').innerText = `Endereço: ${data.logradouro}, ${data.bairro}, ${data.localidade}-${data.uf}`;
        } catch (error) {
            document.getElementById('resultado').innerText = 'Erro ao consultar o CEP';
        }
    }
</script>

```