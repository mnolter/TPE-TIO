document.addEventListener("DOMContentLoaded", iniciar);



function iniciar(){

document.querySelector("#btn-Validar").addEventListener('click',ValidarFormulario);


function ValidarFormulario(){


let Captcha = document.querySelector("#Captcha").value ;
let Registrado = document.querySelector("#MensajeError");
let numero = 7879;

if( Captcha == numero ){
    Registrado.innerHTML = "Gracias por sumarse a nuestro sitio";
    return true;
    }else{
    document.querySelector("#MensajeError").innerHTML = "Valide el Captcha por favor";
    return false;
}

}

}
