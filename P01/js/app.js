const btn = document.getElementById('btn-submit'),
    alfabeto = document.getElementById('alfabeto'),
    potencia = document.getElementById('potencia'),
    divPotenciado = document.getElementById('potenciado');

btn.addEventListener('click', () => {
    divPotenciado.innerHTML = ''
    if (alfabeto.value.length == 0) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, rellena los campos correctamente.',
            icon: 'error',
            color: '#fff',
            background: 'rgb(17, 24, 39)',
            backdrop: 'rgba(0, 0, 0, .3)',
            showConfirmButton: false,
            timer: 3500
        })
    } else {
        const arrayAlfabeto = alfabeto.value.split(',');
        const potenciaNumber = parseInt(potencia.value);

        Swal.fire({
            title: 'Calculando...',
            timer: 3500,
            color: '#fff',
            background: 'rgb(17, 24, 39)',
            backdrop: 'rgba(0, 0, 0, .3)',
            allowOutsideClick: false,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                const alfabetoPotenciado = potenciar(arrayAlfabeto, [], potenciaNumber - 1);

                if (potenciaNumber == 0) {
                    const nodo = document.createElement('div')
                    nodo.innerHTML = '{&#8709;}'
                    divPotenciado.innerHTML = nodo.innerHTML
                } else if (potenciaNumber == 1) {
                    const nodo = document.createElement('div')
                    nodo.innerHTML = '{'
                    for (let i = 0; i < alfabetoPotenciado.length; i++) {
                        if ((alfabetoPotenciado.length - 1) == i)
                            nodo.innerHTML += alfabetoPotenciado[i] + '}'
                        else
                            nodo.innerHTML += alfabetoPotenciado[i] + ','
                    }
                    divPotenciado.innerHTML = nodo.innerHTML
                } else {
                    for (let i = 0; i < arrayAlfabeto.length; i++) {
                        const arrayTemp = alfabetoPotenciado.slice((i * Math.pow(arrayAlfabeto.length, potenciaNumber - 1)), ((i + 1) * Math.pow(arrayAlfabeto.length, potenciaNumber - 1)))
                        const nodo = document.createElement('div')
                        nodo.innerHTML = '{'

                        for (let j = 0; j < arrayTemp.length; j++) {
                            if ((arrayTemp.length - 1) == j)
                                nodo.innerHTML += arrayTemp[j] + '}<br />'
                            else
                                nodo.innerHTML += arrayTemp[j] + ','
                        }
                        divPotenciado.innerHTML += nodo.innerHTML
                    }
                }
            }
        })
    }
})

function potenciar(alfabeto, alfabetoAux, potencia) {
    const alfabetoTemp = [];
    if (potencia >= 1) {
        if (alfabetoAux.length == 0) {
            for (let i = 0; i < alfabeto.length; i++) {
                for (let j = 0; j < alfabeto.length; j++) {
                    alfabetoTemp.push(alfabeto[i] + alfabeto[j])
                }
            }
        } else {
            for (let i = 0; i < alfabetoAux.length; i++) {
                for (let j = 0; j < alfabeto.length; j++) {
                    alfabetoTemp.push(alfabetoAux[i] + alfabeto[j])
                }
            }
        }
        return potenciar(alfabeto, alfabetoTemp, potencia - 1)
    } else {
        // console.log(alfabetoAux);
        // console.log(alfabeto);
        if (alfabetoAux.length == 0)
            return alfabeto
        else
            return alfabetoAux
    }
}