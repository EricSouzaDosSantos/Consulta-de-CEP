
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

            ResetForm()
            alert('the minimum number of numbers is 8')

        }

    } else {

        alert('empty field CEP')
        ResetForm()

        document.getElementById('uf').removeAttribute('readonly')
        document.getElementById('neighborhood').removeAttribute('readonly')
        document.getElementById('city').removeAttribute('readonly')
        document.getElementById('publicPlace').removeAttribute('readonly')

    }

}

const ResetForm = () => {

    document.querySelectorAll('input').forEach(inputs => {

        inputs.value = ''

    })
}

const ConsultAddress = () => {

    const uf = document.getElementById('uf').value
    const city = document.getElementById('city').value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(' ', ' ')
    const address = document.getElementById('publicPlace').value.replace(/\s/g, '+');

    const requestsAddress = new Request(`https://viacep.com.br/ws/${uf}/${city}}/${address}/json/`, {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'aplication/json'
                }
            })

            fetch(requestsAddress)
                .then(responses => responses.json())
                .then(responses => {

                    // if (!("erro" in response)) {

                        document.getElementById('cep').value = responses.cep
                        // document.getElementById('uf').setAttribute('readonly', '')

                        // document.getElementById('neighborhood').value = response.bairro
                        // document.getElementById('neighborhood').setAttribute('readonly', '')


                        // document.getElementById('city').value = response.localidade
                        // document.getElementById('city').setAttribute('readonly', '')

                        // document.getElementById('publicPlace').value = response.logradouro
                        // document.getElementById('publicPlace').setAttribute('readonly', '')

                    // } else {

                    //     alert('CEP not found')
                    //     ResetForm()

                    // }
                })

}