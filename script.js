"use strict";

//HTML Components

//Search
const searchCharacters = document.querySelector(".searchCharacters");
const btnSearchCharacter = document.querySelector("#btnSearchCharacter");
const inputCharacter = document.querySelector("#inputCharacter");

//Slicer
const carrousel = document.querySelector(".carrousel");

//Card
const imgCardOne = document.querySelector(".img-card-one");
const nameCardOne = document.querySelector(".name-card-one");
const containerCard = document.querySelector(".container-card");
const descriptionCardOne = document.querySelector(".description-card-one");
const moreInformationCardOne = document.querySelector(
  ".more-information-card-one"
);

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
          { descriptionImg: [element?.description] },
          { urlDetailImg: [element?.urls?.at(0)?.url] },
        ]);
    });
  });

  //pass image
  let cont = 0;
  passCarousel = setInterval(() => {
    try {
      //asd is the abbreviation of allSpecificData
      let asdUrlImg = allSpecificData[cont][0].urlImg;
      let asdName = allSpecificData[cont][1].nameImg;
      let asdDescription = allSpecificData[cont][2].descriptionImg;
      let asdUrl = allSpecificData[cont][3].urlDetailImg;

      if (cont === allSpecificData.length - 1) cont = 0;

      const img = `${asdUrlImg[0]}.${asdUrlImg[1]}`;

      //Add info for the card
      imgCardOne.src = img;
      nameCardOne.textContent = asdName;
      descriptionCardOne.textContent = asdDescription;
      moreInformationCardOne.textContent = "Show More";
      moreInformationCardOne.href = asdUrl;

      //Show card and Slider
      carrousel.classList.remove("hidden");
      containerCard.classList.remove("hidden");

      cont++;
    } catch (err) {
      console.error(`${err.message} 😐`);
      clearInterval(passCarousel);
    }
  }, 5000);
};

//Button Search Characters
btnSearchCharacter.addEventListener("click", () => {
  clearInterval(passCarousel);
  carousels();
  searchCharacters.style.margin = "5% auto";
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
