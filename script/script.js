
const ConsultCEP = (cep) => {

    cep = cep.replace(/\D/g, '') //regular expression => regex

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
    document.getElementById('neighborhood').value = response.bairro
    document.getElementById('city').value = response.localidade
    document.getElementById('publicPlace').value = response.logradouro
})
}
