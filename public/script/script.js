
const ConsultCEP = (cep) => {

    cep = cep.replace(/\D/g, '') //regular expression => regex

    if (cep != "") {

        const patternCEP = /^[0-9]{8}$/

        if (patternCEP.test(cep)) {

            const requests = new Request(`https://viacep.com.br/ws/${cep}/json`, {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'aplication/json'
                }
            })

            fetch(requests)
                .then(response => response.json())
                .then(response => {

                    if (!("erro" in response)) {

                        document.getElementById('uf').value = response.uf
                        document.getElementById('uf').setAttribute('readonly', '')

                        document.getElementById('neighborhood').value = response.bairro
                        document.getElementById('neighborhood').setAttribute('readonly', '')


                        document.getElementById('city').value = response.localidade
                        document.getElementById('city').setAttribute('readonly', '')

                        document.getElementById('publicPlace').value = response.logradouro
                        document.getElementById('publicPlace').setAttribute('readonly', '')

                    } else {

                        alert('CEP not found')
                        ResetForm()

                    }
                })

        } else {

            alert('the minimum number of numbers is 8')
            return ResetForm()


        }

    } else {

        alert('empty field CEP')
        return ResetForm()



    }

}

const ResetForm = () => {

    document.getElementById('uf').removeAttribute('readonly')
    document.getElementById('neighborhood').removeAttribute('readonly')
    document.getElementById('city').removeAttribute('readonly')
    document.getElementById('publicPlace').removeAttribute('readonly')

    document.querySelectorAll('input').forEach(inputs => {

        inputs.value = ''

    })
}

const ConsultAddress = () => {

    const removeAssents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const uf = document.getElementById('uf').value.replace(/\s/g, ' ')
    const city = document.getElementById('city').value.replace(/\s/g, ' ')
    const address = document.getElementById('publicPlace').value.replace(/\s/g, '+')

    console.log(city, uf, address);

    const requestAddress = new Request(`https://viacep.com.br/ws/${removeAssents(uf)}/${removeAssents(city)}/${removeAssents(address)}/json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(requestAddress)

    fetch(requestAddress)
        .then(response => response.json())
        .then(response => {

            if (!("erro" in response)) {

                document.getElementById('cep').value = response[0].cep;

            } else {

                alert('CEP not found')
                return ResetForm()

            }
        })
        .catch(error => console.error('Error:', error));

    console.clear()
}

const GetCEP = () => {

    let listCEP = []

    const requests = new Request(`http://localhost:3000/address`, {
        'method': 'GET',
        'headers': {
            'Content-Type': 'aplication/json'
        }
    })

    fetch(requests)
        .then(response => response.json())
        .then(response => {

            listCEP = response

            console.log(listCEP)

            if (!("erro" in response)) {

                let table = document.getElementById('table-body');

                let template = ""

                listCEP.forEach(list => {

                    template += `
        
        <tr>
            
            <td data-cell="cep">
                ${list.cep}
            </td>

            <td data-cell="uf">
                ${list.uf}
            </td>

            <td data-cell="publicplace">
                ${list["public place"]}
            </td>

            <td data-cell="city">
                ${list.city}
            </td>

            <td data-cell="neighborhood">
                ${list.neighborhood}
            </td>

            <td data-cell="actions">
                <button type="button" class="button green" onclick="updateUser(${list.id})">update</button>
                <button type="button" class="button red" onclick="deleteUser(${list.id})">Delete</button>
            </td>

        </tr>
          
        `
                });

                table.innerHTML = template

            } else {

                alert('CEPs not found')
                ResetForm()

            }
        })
}

window.addEventListener('DOMContentLoaded', GetCEP)


const RegisterCEP = (address) => {

    fetch('http://localhost:3000/address', {
        "method": "POST",
        "headers": {
            "Content-type": "application/json"
        },
        "body": JSON.stringify(address)
    }).then(resposta => {
        resposta.ok ? window.alert('Endereço cadastrado!') : window.alert('Erro: ' + resposta.status)
    })

}

const UpdateCEP = (address) => {
    const { id, ...restOfAddress } = address;

    fetch(`http://localhost:3000/address/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(restOfAddress)
    }).then(response => {
        response.ok ? window.alert('Endereço atualizado!') : window.alert('Erro: ' + response.status)
    });
}


