const openModal = () => {
    document.getElementById('modal').classList.add('active')
}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
}

document.getElementById('viewCEP').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

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
                <button type="button" class="buttons red" onclick="DeleteCEP('${list.id}')">Delete</button>
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
    }).then(response => {
        response.ok ? window.alert('Address Registered!!') : window.alert('Erro: ' + response.status)
    })

}

const UpdateCEPInfo = (id) => {

    alert('use the update button to update')

    document.getElementById('update').style.display = 'block';

    document.getElementById('update').addEventListener('click', () => UpdateCEP(id));


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

}


const UpdateCEP = (id) => {

    const address = {
        "cep": document.querySelector('#cep').value,
        "public place": document.querySelector('#publicPlace').value,
        "neighborhood": document.querySelector('#neighborhood').value,
        "city": document.querySelector('#city').value,
        "uf": document.querySelector('#uf').value
    };

    const requests = new Request(`http://localhost:3000/address/${id}`, {
        'method': 'PATCH',
        'headers': {
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(address)
    });

    fetch(requests)
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
};


const DeleteCEP = (id) => {

    const requests = new Request(`http://localhost:3000/address/${id}`, {
        'method': 'DELETE',
        'headers': {
            'Content-Type': 'application/json'
        }
    });
    fetch(requests)
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
};

//http://localhost:3000/address/idDoCEP
