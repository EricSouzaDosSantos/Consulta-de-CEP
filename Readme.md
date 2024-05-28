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


### Passo 2: Testar Funcionalidaeds do código

#### JavaScript (exemplo):

``` javscript

    const ConsultCEP = (cep) => {

            const requests = new Request(`https://viacep.com.br/ws/${cep}/json`, {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'aplication/json'
                }
            })

            fetch(requests)
                .then(response => response.json())
                .then(response => {

                        document.getElementById('uf').value = response.uf
                        document.getElementById('uf').setAttribute('readonly', '')

                        document.getElementById('neighborhood').value = response.bairro
                        document.getElementById('neighborhood').setAttribute('readonly', '')


                        document.getElementById('city').value = response.localidade
                        document.getElementById('city').setAttribute('readonly', '')

                        document.getElementById('publicPlace').value = response.logradouro
                        document.getElementById('publicPlace').setAttribute('readonly', '')

                })
    }
```

#### HTML (exemplo):
```HTML
        <form id="Form">

                    <input type="text" id="cep" maxlength="9" placeholder="enter your CEP"
                        onblur="ConsultCEP(this.value)">

                    <input type="text" id="neighborhood" placeholder="enter your neighborhood" >

                    <input type="text" id="city" placeholder="enter your city" onblur="ConsultAddress()">

                    <input type="text" id="uf" placeholder="enter your uf" onblur="ConsultAddress()">

                    <input type="text" id="publicPlace" placeholder="enter your public place" onblur="ConsultAddress()">

                    <input type="text" id="number" placeholder="enter your number">

            </form>

```