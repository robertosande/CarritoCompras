let
    validacionUs = false,
    i = 0,
    articulosDisponibles = document.querySelector('.articulosDisponibles');



const btnInicioSesion = document.getElementById('modalLogin'),
    modalInicio = new bootstrap.Modal(btnInicioSesion),
    btnIniciar = document.getElementById('iniciar'),
    btnRegistrarse = document.getElementById('modalRegistro'),
    modalRegistrarse = new bootstrap.Modal(btnRegistrarse),
    btnRegistrar = document.getElementById('registrar'),
    recuerdo = document.getElementById('recordar'),
    btnCerrarSesion = document.getElementById('btnLogout'),
    usuarioLogin = document.getElementById('usuarioLogin'),
    passLogin = document.getElementById('passLogin'),
    recordar = document.getElementById('recordarme'),
    toggles = document.querySelectorAll('.toggles'),
    busqueda = document.querySelectorAll('.inputBusqueda'),
    contenedorCarrito = document.getElementById('carrito-contenedor'),
    contenedorModal = document.getElementsByClassName('modal-contenedor')[0],
    btnAbrirCarrito = document.getElementById('boton-carrito'),
    btnCerrarCarrito = document.getElementById('carritoCerrar'),
    modalCarrito = document.getElementsByClassName('modal-carrito')[0],
    btnVaciarCarrito = document.getElementById('vaciar-carrito'),
    btnEliminarDeCarrito = document.getElementById('boton-eliminar'),
    contCarrito = document.getElementById('contadorCarrito'),
    precioCarrito = document.getElementById('precioTotal'),
    tarjetaArticulo = document.getElementById('tarjetaArticulo'),
    btnComprarCarrito = document.getElementById('Comprar-carrito');



class usuario {
    constructor(user, pass, idUs) {
        this.user = user.toLowerCase();
        this.pass = pass.toLowerCase();
        this.idUs = idUs;
    }
    asignarIdUs(array) {
        this.idUs = array.length;
    }

}

const usuarios = [
    new usuario('cosme', 'fulanito', 1),
    new usuario('roberto', 'sande', 2)
]

class articulo {

    constructor(nombre, categoria, precio, anio, stock, id, unidad, img) {
        this.nombre = nombre.toUpperCase();
        this.categoria = categoria.toUpperCase();
        this.precio = parseFloat(precio);
        this.anio = parseInt(anio);
        this.stock = parseInt(stock);
        this.id = id;
        this.unidad = unidad;
        this.img = img;
    }
}

/* const articulos = [
    new articulo('MONOPATIN ELECTRICO', 'VEHICULO', 15000, 2020, 200, 1, 1, './img/monoElectrico.png'),
    new articulo('BICICLETA', 'VEHICULO', 20000, 2021, 100, 2, 1, './img/bici.jpg'),
    new articulo('PELOTA MUNDIAL 2022', 'DEPORTE', 3000, 2022, 300, 3, 1, './img/pelotaMundial.jpg'),
    new articulo('SKATE', 'VEHICULO', 10000, 2020, 250, 4, 1, './img/skate.jpg'),
    new articulo('HELADERA SAMSUNG', 'HOGAR', 95000, 2020, 50, 5, 1, './img/heladeraSamsung.jpg'),
    new articulo('HORNO', 'HOGAR', 60000, 2021, 60, 6, 1, './img/horno.jpg'),
    new articulo('TV SMART 32 SAMSUNG"', 'HOGAR', 55000, 2021, 150, 7, 1, './img/tvSmart32Samsung.jpg'),
    new articulo('AURICULARES INALAMBRICOS LOGITECH', 'TECNOLOGIA', 9500, 2020, 200, 8, 1, './img/aurisLogitech.jpg'),
    new articulo('TECLADO MECANICO REDRAGON', 'TECNOLOGIA', 12000, 2021, 210, 9, 1, './img/tecladoRedragon.jpg'),
    new articulo('MOUSE GAMER', 'TECNOLOGIA', 9500, 2022, 300, 10, 1, './img/MouseGame.jpg')
]; */

const carrito = [];


function registroUsuario(usuariosDB, userRegistro, passRegistro, passConfirmacion) {
    while (validacionUs == false) {
        let nuevoUser = userRegistro.toLowerCase();
        let nuevoPass = passRegistro.toLowerCase();
        let confirmacionPass = passConfirmacion.toLowerCase();
        const comparacionUser = usuariosDB.filter((usuario) => usuario.user === nuevoUser);
        if (comparacionUser != 0) {

            return (alert('Usuario ingresado ya existe, por favor ingrese uno nuevamente.'));

        } else {
            if (confirmacionPass != nuevoPass) {
                return (alert('Las contraseñas no coinciden.'));
            } else {


                const usuarioNuevo = new usuario(nuevoUser, nuevoPass);
                usuariosDB.push(usuarioNuevo);
                usuarioNuevo.asignarIdUs(usuariosDB);
                alert("Nuevo usuario cargado exitosamente.")
                usuarioRegistro.value = '';
                contraRegistro.value = '';
                contraConfirmacion.value = '';
                validacionUs = true;
                return (modalRegistrarse.hide());
            }
        }
    }
}

function inicioSesion(usuariosDB, userLogin, contraLogin) {
    let userIngresado = usuariosDB.find((usuariosDB) => usuariosDB.user == userLogin);

    if (typeof userIngresado === 'undefined') {    //TYPEOF dice cual es el tipo de dato de la variable
        return false;
    } else {
        //si estoy en este punto, quiere decir que el mail existe, sólo queda comparar la contraseña
        if (userIngresado.pass != contraLogin) {
            return false;
        } else {
            return userIngresado;
        }
    }
}

function logueoGuardado(usuario) {

    if (usuario) {
        saludoUs(usuario);
        mostrarData();
        intercambiarPresentacion(toggles, 'd-none');
    }

}

function mostrarArticulos(array) {
    tarjetaArticulo.innerHTML = ''; //limpia el contenedor de tarjetas

    array.forEach((element) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
    <h3>${element.nombre}</h3>
    <img src="${element.img}" class="card-img-top imagenProducto">
    <div class="card-body">
    <p class="card-text" id="categoriaArticulo"><h5>CATEGORIA: ${element.categoria}</h5> </p>
    <p class="card-text" id="anioArticulo">AÑO: ${element.anio} </p>
    <p class="card-text" id="cantidadArticulo">STOCK: ${element.stock} </p>
    <p class="card-text" id="precioArticulo"><h5>PRECIO: $ ${element.precio}</h5></p>
    <button id="agregar${element.id}" class="btn btn-primary">Agregar <i class="fas fa-shopping-cart"></i></button>
    `

        tarjetaArticulo.appendChild(div)

        const btnAgregar = document.getElementById(`agregar${element.id}`)

        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(element.id)
            Toastify({
                text: 'Articulo Agregado',
                duration: 1500,
                style: {
                    color: 'white',
                    width: '15vw',
                    height: 80,
                    background: "radial-gradient(circle, rgba(0,15,143,1) 0%, rgba(3,0,103,1) 61%, rgba(0,0,0,1) 100%)"
                }
            }).showToast();
        })

    })

}




async function agregarAlCarrito(articuloID) { // DESCONTAR STOCK DE LA PAGINA AL AGREGAR AL CARRITO
    const respuesta = await fetch('./js/Articulos.json'); 
    const data = await respuesta.json();

    
    const repetido = carrito.some(articulo => articulo.id === articuloID)
    
    if (repetido) {

        const producto = carrito.map(producto => {

            if (producto.id === articuloID) { 
                producto.unidad++;
                data[articuloID].stock-=1;
                //console.log(data);
                };
            
           
        })


        
    } else {

        const producto = data.find((articulo) => articulo.id === articuloID);
        data[articuloID].stock-=1;

        carrito.push(producto);
        
        
    }
    console.log(data);
    actualizarCarrito();
    mostrarArticulos(data);
    
    
}


/* async function actualizarStock(artStock){

    artStock -=1 ; 
    console.log(artStock);
    

} */


function actualizarCarrito() {

    contenedorCarrito.innerHTML = ""


    carrito.forEach((producto) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: $${producto.precio}</p>
        <p>Cantidad: <span id="cantidad">${producto.unidad}</span></p>
        <button onclick="borrarArticuloCarrito(${producto.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)



    })
    contCarrito.innerText = carrito.length;
    precioCarrito.innerText = carrito.reduce((total, articulo) => total + articulo.unidad * articulo.precio, 0);

}

function borrarArticuloCarrito(articuloID) {
    const art = carrito.find((articulo) => articulo.id === articuloID);
    const indice = carrito.indexOf(art);
    carrito.splice(indice, 1);

    actualizarCarrito();

}




function guardarDatos(usuarioDB, storage) {
    const userGuardado = {
        'nombre': usuarioDB.user,
        'contra': usuarioDB.pass,
    }

    storage.setItem('userGuardado', JSON.stringify(userGuardado));
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

function traerUsuario(storage) {
    let usuarioStorage = JSON.parse(storage.getItem('userGuardado'));
    return usuarioStorage;
}

function saludoUs(usuario) {
    nombreUsuario.innerHTML = `<h3>Bienvenid@, <span>${(usuario.nombre).toUpperCase()}</span></h3>`
}

function buscar(array, atributo, input) {
    return array.filter((arti) => arti[atributo].includes(input))
}

busqueda.forEach(input => {
    input.addEventListener('input', () => {
        let palabra = (input.value).toUpperCase();
        mostrarArticulos(buscar(articulos, input.id, palabra), articulosDisponibles);
    })
    input.onblur = () => {
        input.value = '';

    }

});

function intercambiarPresentacion(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

function limpiarCarrito() {
    carrito.length = 0;
    actualizarCarrito();
}


function mostrarData(){
    fetch('./js/Articulos.json') //traigo la info desde el archivo JSON (fake API)
        .then((respuesta) => respuesta.json())
        .then((data) => { mostrarArticulos(data);
        })
}





btnIniciar.addEventListener('click', (e) => {
    e.preventDefault();
    if (i < 4) {
        if (!usuarioLogin.value || !passLogin.value) {
            i++;
            alert('Todos los campos son requeridos\n(Te quedan ' + (5 - i) + ' intentos)');


        } else {

            let data = inicioSesion(usuarios, usuarioLogin.value, passLogin.value);

            if (!data) {
                i++;
                alert('Usuario y/o contraseña erróneos \n(Te quedan ' + (5 - i) + ' intentos)');


            } else {


                if (recordar.checked) {
                    guardarDatos(data, localStorage);
                    saludoUs(traerUsuario(localStorage));
                } else {
                    guardarDatos(data, sessionStorage);
                    saludoUs(traerUsuario(sessionStorage));
                }
                usuarioLogin.value = '';
                passLogin.value = '';
                modalInicio.hide();
                i = 0;
                
                mostrarData();
                intercambiarPresentacion(toggles, 'd-none');


            }
        }
    } else {
        alert('Te quedaste sin intentos, volve a intentarlo mas tarde.')
        i = 0;
        modalInicio.hide();
    }

});

btnRegistrar.addEventListener('click', (e) => {
    e.preventDefault();
    (!usuarioRegistro.value || !contraRegistro.value || !contraConfirmacion.value) ? alert('Todos los campos son requeridos') : registroUsuario(usuarios, usuarioRegistro.value, contraRegistro.value, contraConfirmacion.value);


})

btnCerrarSesion.addEventListener('click', () => {

    intercambiarPresentacion(toggles, 'd-none');
    borrarDatos();
});

btnAbrirCarrito.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active');
})
btnCerrarCarrito.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active');
})

contenedorModal.addEventListener('click', (event) => {
    contenedorModal.classList.toggle('modal-active');
})

modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation();
})


btnVaciarCarrito.addEventListener('click', () => {
    Swal.fire({
        title: '¿Seguro deseas vaciar carrito?',
        text: "Deberas volver a seleccionar articulos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Vaciado!',
            'Tu carrito esta limpio',
            'success'

          )
          limpiarCarrito();
        }
      })
    

})

btnComprarCarrito.addEventListener('click', () => {
    
    Swal.fire(
        'Compra realizada',
        'Importe total: $'+precioCarrito.innerText,
        'success'
      )
   

    limpiarCarrito();
    contenedorModal.classList.toggle('modal-active');

})



window.onload = () => logueoGuardado(traerUsuario(localStorage));