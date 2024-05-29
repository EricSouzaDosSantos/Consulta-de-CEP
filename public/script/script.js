const openModal = () => {
    document.getElementById('modal').classList.add('active')
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
}

document.getElementById('viewCEP').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);


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

            <td data-cell="neighborhood">
            ${list.neighborhood}
            </td>

            <td data-cell="city">
            ${list.city}
            </td>

            <td data-cell="actions">
                <button type="button" class="buttons green" onclick="UpdateCEPInfo('${list.id}')">update</button>
                <button type="button" class="buttons red" onclick="DeleteCEP(${list.id})">Delete</button>
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

const UpdateCEPInfo = (id) => {

    const requests = new Request(`http://localhost:3000/address/${id}`, {
        'method': 'GET',
        'headers': {
            'Content-Type': 'aplication/json'
        }
    })

    fetch(requests)
        .then(response => response.json())
        .then(response => {

            document.getElementById('cep').value = response.cep

            document.getElementById('uf').value = response.uf

            document.getElementById('neighborhood').value = response.neighborhood

            document.getElementById('city').value = response.city

            document.getElementById('publicPlace').value = response['public place']

        })

    closeModal()

    document.getElementById('updateCEP').removeEventListener('click');
    document.getElementById('updateCEP').addEventListener('click', alert("botaooooooooooooo"));
}


const UpdateCEP = (id) => {

    alert(id)

    const address = {
        "cep": document.querySelector('#cep').value,
        "public place": document.querySelector('#publicPlace').value,
        "neighborhood": document.querySelector('#neighborhood').value,
        "city": document.querySelector('#city').value,
        "uf": document.querySelector('#uf').value
    }

    const requests = new Request(`http://localhost:3000/address/${id}`, {
        'method': 'PATCH',
        'headers': {
            'Content-Type': 'aplication/json'
        },
        "body": address
    })
    // .then(resposta => {
    //     resposta.ok ? window.alert('Endereço Atualizado com sucesso!') : window.alert('Erro: ' + resposta.status)
    // })

}

//http://localhost:3000/address/idDoCEP
