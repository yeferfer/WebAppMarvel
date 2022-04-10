'use strict';

//Button Page Search
document.querySelector('.btnPageLogin').addEventListener('click', () => {
  document.querySelector('.pageLogin').classList.remove('hidden');
  document.querySelector('.pageHome').classList.add('hidden');
});

let keys = {};
window.addEventListener(
  'keydown',
  function (e) {
    keys[e.keyCode] = true;
    switch (e.keyCode) {
      case 39:
        e.preventDefault();
        break;
      default:
        break;
    }
  },
  false
);

window.addEventListener(
  'keyup',
  function (e) {
    keys[e.keyCode] = false;
  },
  false
);

const lyrics = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

//Get Api data
const getDataHome = async function (
  character = lyrics[Math.trunc(Math.random() * lyrics.length) + 1]
) {
  try {
    const request = await fetch(
      `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${character}&ts=1&apikey=35d5da2d7a9b9cc5a68d34e8c1f0b8f2&hash=701d981312a61e2d8957fa50bb9b8b60`
    );
    const AllData = await request.json().then(data => data?.data?.results);
    return AllData;
  } catch (err) {
    console.error(`${err.message} 😐`);
  }
};

//Slider Hero Start
const slider = document.querySelector('#slider');
let sliderSection = document.querySelectorAll('.slider__section');
let sliderSectionLast = sliderSection[sliderSection.length - 1];

const btnLeft = document.querySelector('#btn-left');
const btnRight = document.querySelector('#btn-right');

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function Next() {
  let sliderSectionFirst = document.querySelectorAll('.slider__section')[0];
  slider.style.marginLeft = '-200%';
  slider.style.transition = 'all 0.5s';
  setTimeout(function () {
    slider.style.transition = 'none';
    slider.insertAdjacentElement('beforeend', sliderSectionFirst);
    slider.style.marginLeft = '-100%';
  }, 500);
}

function Prev() {
  let sliderSection = document.querySelectorAll('.slider__section');
  let sliderSectionLast = sliderSection[sliderSection.length - 1];
  slider.style.marginLeft = '0%';
  slider.style.transition = 'all 0.5s';
  setTimeout(function () {
    slider.style.transition = 'none';
    slider.insertAdjacentElement('afterbegin', sliderSectionLast);
    slider.style.marginLeft = '-100%';
  }, 500);
}

btnRight.addEventListener('click', function () {
  Next();
});

btnLeft.addEventListener('click', function () {
  Prev();
});

setInterval(() => {
  Next();
}, 5000);

/* Slider Hero End */

/* Slider Dots */
// Investigar como fusionar dots con arrows

/* const containerCarrousel = document.querySelector(".slider");

const punto = document.querySelectorAll(".punto"); */

// Asignar un click a cada punto
// Cuando se hace click en cada punto
// Saber la posición de ese punto
// Aplicar un transform translateX al grande
// QUITAR la clase activo de todos los puntos
// AÑADIR la clase activo al punto que hemos hecho click

// Recorrer TODOS los puntos

/* punto.forEach((cadaPunto, i) => {
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
}); */

/* Pruebas API */

// const getCharacterData = async function (character) {
//   const response = await fetch(
//     `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${character}&ts=1&apikey=35d5da2d7a9b9cc5a68d34e8c1f0b8f2&hash=701d981312a61e2d8957fa50bb9b8b60`
//   );
//   console.log(response);
//   const data = await response.json();
//   console.log(data);
// };

// getCharacterData("spiderman");

//Get Specific Api Data
const allSpecificDataHome = new Array();
const GetCardsData = () => {
  getDataHome().then(res => {
    res.forEach(element => {
      if (
        element?.thumbnail?.path !==
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
      )
        allSpecificDataHome.push([
          {
            urlImg: [element?.thumbnail?.path, element?.thumbnail?.extension],
          },
          { nameImg: [element?.name] },
        ]);
    });
    //Verify That Have 20 Images
    if (allSpecificDataHome.length < 20) {
      allSpecificDataHome.splice();
      GetCardsData();
    }

    //Assign Values ​​to Cards
    const imgHome = document.querySelectorAll('.imgHome');
    const titleCardImg = document.querySelectorAll('.titleCardImg');
    const imgCardApi = new Array();
    const titleCardApi = new Array();

    allSpecificDataHome.forEach(element => {
      imgCardApi.push(
        `${element.at(0).urlImg.at(0)}.${element.at(0).urlImg.at(1)}`
      );
      titleCardApi.push(element.at(1).nameImg.at(0));
    });

    imgHome.forEach((element, i) => {
      element.src = imgCardApi[i];
    });

    titleCardImg.forEach((element, i) => {
      element.textContent = titleCardApi[i];
    });
  });
};

GetCardsData();
