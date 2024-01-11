//variables
const caja = document.querySelector("#caja");

const u = document.querySelector("#e")
const p = document.querySelector(".pc")
console.log(p);
//evento
caja.addEventListener("click", cambiarColor);

//funcion cambiar color
function cambiarColor(){

  if (p.classList.contains('filtro')) {
    p.classList.remove('filtro');
    p.classList.add('pc');
    u.classList.remove('u');
    u.classList.add('filtro');
  } else {
    p.classList.remove('pc');
    p.classList.add('filtro');
    u.classList.remove('filtro');
    u.classList.add('u');
  }
 

}