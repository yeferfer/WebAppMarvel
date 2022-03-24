"use strict";

//HTML Components
const btnSearchCharacter = document.querySelector("#btnSearchCharacter");
const inputCharacter = document.querySelector("#inputCharacter");
const carousel1 = document.querySelector(".carousel1");
const carousel1Name = document.querySelector(".carousel1Name");

//This is the function that retrieves the information in the API for the carousels
const getData = async function (character) {
  try {
    const request = await fetch(
      `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${character}&ts=1&apikey=35d5da2d7a9b9cc5a68d34e8c1f0b8f2&hash=701d981312a61e2d8957fa50bb9b8b60`
    );
    const AllData = await request.json().then((data) => data?.data?.results);
    console.log(AllData);
    return AllData;
  } catch (err) {
    console.error(`${err.message} 😐`);
  }
};

// This is the carousel function
let passCarousel;
const carousels = () => {
  const allSpecificData = new Array();
  getData(inputCharacter.value).then((res) => {
    res.forEach((element) => {
      if (
        element?.thumbnail?.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
      )
        allSpecificData.push([
          { urlImg: [element?.thumbnail?.path, element?.thumbnail?.extension] },
          { nameImg: [element?.name] },
        ]);
    });
  });

  //pass image
  let cont = 0;
  passCarousel = setInterval(() => {
    try {
      //asd is the abbreviation of allSpecificData
      let asdUrlImg = allSpecificData[cont][0].urlImg;
      let asdname = allSpecificData[cont][1].nameImg;

      if (cont === allSpecificData.length - 1) cont = 0;

      const img = `${asdUrlImg[0]}.${asdUrlImg[1]}`;
      const name = asdname;

      carousel1.src = img;
      carousel1Name.textContent = name;
      carousel1.classList.add("carousel");
      cont++;
    } catch (err) {
      console.error(`${err.message} 😐`);
      clearInterval(passCarousel);
    }
  }, 3000);
};

//Button Search Characters
btnSearchCharacter.addEventListener("click", () => {
  clearInterval(passCarousel);
  carousels();
});

// Slider

const containerCarrousel = document.querySelector(".container-carrousel");

const punto = document.querySelectorAll(".punto");

// Asignar un click a cada punto
// Cuando se hace click en cada punto
// Saber la posición de ese punto
// Aplicar un transform translateX al grande
// QUITAR la clase activo de todos los puntos
// AÑADIR la clase activo al punto que hemos hecho click

// Recorrer TODOS los puntos
punto.forEach((cadaPunto, i) => {
  // Asignar un click a cadaPunto
  punto[i].addEventListener("click", () => {
    // Guardar la posición de ese PUNTO
    let posicion = i;
    // Calculando el espacio que debe DESPLAZARSE el .container-carrousel
    let operacion = posicion * -33.33;

    // Movemos el containerCarrousel
    containerCarrousel.style.transform = `translateX(${operacion}%)`;

    // Recorremos TODOS los puntos
    punto.forEach((cadaPunto, i) => {
      // Quitamos la calse "activo" a todos los punto
      punto[i].classList.remove("activo");
    });
    // Añadir la calse "activo" en el punto que hemos hecho click
    punto[i].classList.add("activo");
  });
});
