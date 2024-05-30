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

