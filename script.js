const cep = document.querySelector('#cep');

const endereco = (dados) => {
    for (let x in dados) {
        console.log(cep)
        if(document.querySelector('#' + x)) {
            document.querySelector('#' + x).value = dados[x]
        }
    }
}

cep?.addEventListener('blur', (e) => {

    e.preventDefault

    console.log(cep)

    let search = cep.value;

    // fetch api usa promises (then, catch)
    // site de verificacao de cep
    fetch(`https://viacep.com.br/ws/${search}/json/`, {
        method: 'get', 
        mode: 'cors',
        cache: 'default'
    })
    .then(res => {
        res.json()
        .then(dados => {
            endereco(dados)
        })
    })
    .catch();
})


// fetch('http://localhost:3000/app.js')
//     .then(response => response.json)
//     .then(data => console.log(data))

// function showData() {

//     document.querySelector('#element').innerHTML += 'Hi there'

    
//         let table = document.querySelector('#table')
//         data.forEach(row => {
//             let tr = document.createElement('tr');
//             tr.appendChild(document.createElement('th').innerText(row.item1))
//         })
//     })
//     console.log('Hi there')
// }

// const btnConsulta = document.querySelector('btnConsulta')

// btnConsulta.addEventListener('click', () => {

//     fetch('/consulta', {
//         method: 'get',
//         cache: 'default'
//     })
//     .then(res => {res.json()
//         .then(data =>(dados(data)))
//     })
// })