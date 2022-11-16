import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");

inputs.forEach(input=> {                            //regresa un arreglo
    input.addEventListener("blur",(input) => {
        valida(input.target);
    });
});

