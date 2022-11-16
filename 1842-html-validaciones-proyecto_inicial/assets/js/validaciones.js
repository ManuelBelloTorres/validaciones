/*const inputNacimiento = document.querySelector("#birth");//id de fecha

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
})*/

export function valida(input){  //exporta la función
     const tipoDeInput = input.dataset.tipo;//selecciona el tipo data y la conexion al data con el nombre .tipo
    if(validadores[tipoDeInput]){ // si dentro de validadores existe el tipo de input, si existe llamo a validadores con el tipoDeInput y envio el contenido de input 
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid) { 
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML="";
    } else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML=mostrarMensajeDeError(tipoDeInput,input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patterMismatch",
    "customError",
];

const mensajesDeError = { // se desciben uno a uno los inputs y su mensaje de error 
    nombre:{ 
        valueMissing:"El campo de Nombre no puede estar vacio",
    },
    email:{
        valueMissing:"El campo Correo Electrònico no puede estar vacio", //en caso de que este campo estè vacio
        typeMismatch:"El correo no es valido", //hace referencia para correo electrònico
    },
    password:{
        valueMissing:"El campo de Contraseña no puede estar vacio",
        patterMismatch:"8 caracteres,una letra mayúscula, un carácter especial y caracteres alfanuméricos", //hace referencia para mensaje esperado en password
    },
    nacimiento:{
        valueMissing:"El campo de Fecha de Nacimiento no puede estar vacio",
        customError:"Debes tener al mrenos 18 años de edad.",
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "El formato requerido es xxxxxxxxxx 10 números",
    },
    direccion:{
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "La dirección debe contener entre 10 y 40 caracteres",
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "La ciudad debe contener entre 10 y 40 caracteres",
    },
    estado:{
        valueMissing: "Este campo no puede estar vacio",
        patterMismatch: "El estado debe contener entre 10 y 40 caracteres",
    },
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje="";
    tipoDeErrores.forEach((error) => {  //Acceso al array
        if(input.validity[error]) {
            console.log(tipoDeInput,error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput],[error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}


function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al mrenos 18 años de edad.";

    };
    input.setCustomValidity(mensaje); // define el mensaje de validadción personalizado para el elemento seleccionado
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas= new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
);
    return diferenciaFechas <= fechaActual;

}