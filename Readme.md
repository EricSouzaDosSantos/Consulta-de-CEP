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

## Contribuição 

Este é um projeto de código aberto, então sinta-se à vontade para contribuir com sugestões, correções de bugs ou até mesmo novas funcionalidades. Todas as contribuições são bem-vindas!

## Licença 

Este projeto está licenciado sob a Licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).

---
