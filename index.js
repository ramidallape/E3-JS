const pizzas = [
  {
    id: 1,
    nombre: "Pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "Pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "Pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "Pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "Pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const inputTxt = document.getElementById("input-txt");
const btnSubmit = document.querySelector("#btn-submit");
const form = document.getElementById("form");
const display = document.querySelector(".display");
const body = document.querySelector("body");

let pizzaOk;
//

const ultima = JSON.parse(localStorage.getItem("ultimaPizza"));
console.log(ultima);
if (ultima) {
  body.style.backgroundImage = "url('" + ultima.imagen + "')";
  // ultimaPizza.imagen;
  imprimePizza(ultima);
}

function imprimePizza(cualPizza) {
  const { nombre, precio, ingredientes, imagen } = cualPizza;
  body.style.backgroundImage = "url(" + imagen + ")";

  //displayFoto
  const displayFoto = document.createElement("img");
  while (displayFoto.firstChild) {
    display.removeChild(displayFoto.firstChild);
  }
  displayFoto.src = imagen;
  displayFoto.classList.add("foto");

  //displayInfo
  const displayInfo = document.createElement("div");
  displayInfo.classList.add("display-info");

  //displayInfoTitulo
  const displayInfoTitulo = document.createElement("h2");
  while (displayInfoTitulo.firstChild) {
    display.removeChild(displayInfoTitulo.firstChild);
  }
  displayInfoTitulo.textContent = nombre;
  displayInfoTitulo.classList.add("titulo");

  //displayInfoIngredientes
  const displayInfoIngredientes = document.createElement("p");
  while (displayInfoIngredientes.firstChild) {
    display.removeChild(displayInfoIngredientes.firstChild);
  }
  console.log();
  displayInfoIngredientes.innerHTML =
    "<b>Ingredientes:</b> " +
    ingredientes.slice(0, ingredientes.length - 1).join(", ") +
    " y " +
    ingredientes.slice(ingredientes.length - 1) +
    ".";
  displayInfoIngredientes.classList.add("ingredientes");

  //displayInfoPrecio
  const displayInfoPrecio = document.createElement("p");
  while (displayInfoPrecio.firstChild) {
    display.removeChild(displayInfoPrecio.firstChild);
  }
  displayInfoPrecio.textContent = "Valor: $ " + precio + ",-";
  displayInfoPrecio.classList.add("precio");

  displayInfo.appendChild(displayInfoTitulo);
  displayInfo.appendChild(displayInfoIngredientes);
  displayInfo.appendChild(displayInfoPrecio);

  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  display.appendChild(displayFoto);
  display.appendChild(displayInfo);
}

function buscaPizza(datoId) {
  pizzaOk = pizzas.find((pizza) => pizza.id === datoId);
  return pizzaOk || 0;
}

function leerForm(e) {
  e.preventDefault();
  dato = parseInt(inputTxt.value);
  const ingresoAlgo = inputTxt.value === "" ? false : true;

  if (buscaPizza(dato) != 0) {
    //Lo que hago si encontró pizza

    imprimePizza(pizzaOk);

    //Guardar pizza en localstorage reemplazando la anterior.
    localStorage.setItem("ultimaPizza", JSON.stringify(pizzaOk));
  } else if (ingresoAlgo) {
    //Lo que hago si no encontró pizza
    errorDisplay("El número de pizza ingresado no existe");
  } else {
    //Error porque no ingresó nada:
    errorDisplay("Debe ingresar un número");
  }
  inputTxt.value = "";
}

function errorDisplay(msg) {
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  const displayMsg = document.createElement("div");
  displayMsg.textContent = msg;
  displayMsg.classList.add("error");

  display.appendChild(displayMsg);
  body.style.backgroundImage = "url('./img/caja-vacia.jpg')";
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
}

function init() {
  pizzaOk = "";
  form.addEventListener("submit", leerForm);
}

init();