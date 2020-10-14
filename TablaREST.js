document.addEventListener('DOMContentLoaded', function(){
    
    document.querySelector('#btn-EnviarSkin').addEventListener('click', EnviarSkin);
    document.querySelector('#btn-EnviarTres').addEventListener('click', EnviarTres);
    
    
    let  ulrApi = 'https://web-unicen.herokuapp.com/api/groups/117Nolterparcial1/skin/'
    
    
    // Actualizo la tabla en cada interaccion con los botones con los filtros pasados como parametro //
    
    function ActualizarTabla(){
        fetch(ulrApi, {
            "method": "GET",
            "mode": "cors",
        }).then(function(r){
            if(!r.ok){
                console.log("Muestro error")
            }
            return r.json()
        })
        .then(function(json){
            crearTabla(json);
        })
        .catch(function(e){
            console.log(e)
        })

    }

    function crearTabla(json){
        let tbody = document.querySelector("#tbody");
        tbody.innerHTML="";
        console.log(json);
        // Recorro el arreglo con el json guardado para ir sumando las filas necesarias//
        /* let filtrado = json;
        if(filtros){
            filtrado = json.skin.filter( SkinFiltrados =>{
                return SkinFiltrados.thing.Estado == filtros;
            })
        }else{
            filtrado = json.skin.filter (SkinFiltrados =>{
                return SkinFiltrados.thing;
            })
        }
        let filtros = document.querySelector('#opciones');
        filtros.addEventListener('change', (event) => {
        ActualizarTabla(event.target.value); });

        */

        for (let filas of json.skin){
            tbody.innerHTML +=
            `<tr id='${filas._id}'>
            <td> ${filas.thing.Nombre}</td>
            <td> ${filas.thing.Estado}</td>
            <td> ${filas.thing.Precio}</td>
            <td> <button class="btn-editar"> Editar </td>
            <td> <button class="btn-borrar"> Borrar </td>
            </tr>`;
            AgregarEventosBorrar();
            AgregarEventosEditar();
            console.log(tbody);
        }
    }

    function EnviarSkin(){
        event.preventDefault();
        let Nombre = document.querySelector('#Nombre').value;
        let Estado = document.querySelector('#Estado').value;
        let Precio = document.querySelector('#Precio').value;
        let enviar_skin = {
            "thing": {
                "Nombre": Nombre,
                "Estado": Estado,
                "Precio": Precio
            }
        };
        fetch(ulrApi,{
            "method": "POST",
            "mode" : "cors",
            "headers" : {"Content-type" : "application/json"},
            "body" : JSON.stringify(enviar_skin)
        })
        .then (function(r){
            if(!r.ok){
                console.log("Muestro Error")
            }
            return r.json()
        })
        .then(function(){
            ActualizarTabla();
        }).catch(function(e){
            console.log(e)
        });

    }


// Agrego los Eventos a los botones BORRAR y EDITAR
    function AgregarEventosBorrar(){
        let botonEditar= document.querySelectorAll(".btn-borrar");
        for(let i = 0; i < botonEditar.length; i++){
            botonEditar[i].addEventListener("click",eliminar_fila);
        }
}

    function AgregarEventosEditar() {
        let botonBorrar = document.querySelectorAll(".btn-editar");
        for (let i = 0; i < botonBorrar.length; i++) {
            botonBorrar[i].addEventListener("click", editar_fila);
        }
}


// Funcion que ejecuta el boton borrar.
function eliminar_fila(event){
    fetch(ulrApi + event.target.parentNode.parentNode.id ,{
        "method": "DELETE",
        "mode": 'cors',
        "headers": { "Content-Type": "application/json" },
    }).then(function(r){
        if (!r.ok) {
            console.log("error")
        }
        return r.json()
    }).then(function(){
        ActualizarTabla();
    }).catch(function (e) {
            console.log(e)
    })



}

//Funcion que ejecuta el boton borrar.
function editar_fila(event) {
    let editarNombre = document.querySelector("#editarNombre").value;
    let editarEstado = document.querySelector("#editarEstado").value;
    let editarPrecio = document.querySelector("#editarPrecio").value;

    if (editarNombre.length === 0 || editarEstado.length === 0  || editarPrecio.length === 0) {
        let contenedor = document.querySelector("#errorEditar");
        contenedor.innerHTML = "Ingrese el item que falta";
        return;
    }
    else {
        let contenedor = document.querySelector("#errorEditar");
        contenedor.innerHTML = " ";
    }
    let fila = {
        "thing": {
            "Nombre": editarNombre,
            "Estado": editarEstado,
            "Precio": editarPrecio
        }
    };
    fetch(ulrApi + event.target.parentNode.parentNode.id ,{
        "method": "PUT",
        "mode": 'cors',
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(fila)
    }).then(function(r){
        if (!r.ok) {
            console.log("error")
        }
        return r.json()
    }).then(function(){
        ActualizarTabla();
    }).catch(function (e) {
            console.log(e)
    })

}
function EnviarTres(){
    for (let i = 0; i < 3; i++) {
        EnviarSkin();
    }


}

    ActualizarTabla();

});







