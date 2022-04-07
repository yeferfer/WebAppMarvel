"use strict";

document.querySelector("#btnPageSearch").addEventListener("click", () => {
  document.querySelector(".pageSearch").classList.remove("hidden");
});

const lyrics = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const getDataHome = async function (
  character = lyrics[Math.trunc(Math.random() * lyrics.length) + 1]
) {
  try {
    const request = await fetch(
      `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${character}&ts=1&apikey=35d5da2d7a9b9cc5a68d34e8c1f0b8f2&hash=701d981312a61e2d8957fa50bb9b8b60`
    );
    const AllData = await request.json().then((data) => data?.data?.results);
    return AllData;
  } catch (err) {
    console.error(`${err.message} 😐`);
  }
};

/* Slider Hero Start */

const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider__section");
let sliderSectionLast = sliderSection[sliderSection.length - 1];

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");

slider.insertAdjacentElement("afterbegin", sliderSectionLast);

function Next() {
  let sliderSectionFirst = document.querySelectorAll(".slider__section")[0];
  slider.style.marginLeft = "-200%";
  slider.style.transition = "all 0.5s";
  setTimeout(function () {
    slider.style.transition = "none";
    slider.insertAdjacentElement("beforeend", sliderSectionFirst);
    slider.style.marginLeft = "-100%";
  }, 500);
}

function Prev() {
  let sliderSection = document.querySelectorAll(".slider__section");
  let sliderSectionLast = sliderSection[sliderSection.length - 1];
  slider.style.marginLeft = "0%";
  slider.style.transition = "all 0.5s";
  setTimeout(function () {
    slider.style.transition = "none";
    slider.insertAdjacentElement("afterbegin", sliderSectionLast);
    slider.style.marginLeft = "-100%";
  }, 500);
}

btnRight.addEventListener("click", function () {
  Next();
});

btnLeft.addEventListener("click", function () {
  Prev();
});

setInterval(() => {
  Next();
}, 5000);

/* Slider Hero End */

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

const allSpecificDataHome = new Array();

const moreThanTenImg = () => {
  getDataHome().then((res) => {
    res.forEach((element) => {
      if (
        element?.thumbnail?.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
      )
        allSpecificDataHome.push([
          {
            urlImg: [element?.thumbnail?.path, element?.thumbnail?.extension],
          },
          { nameImg: [element?.name] },
        ]);
    });

    if (allSpecificDataHome.length < 18) {
      allSpecificDataHome.splice();
      moreThanTenImg();
    }

    const imgHome = document.querySelectorAll(".imgHome");
    const titleCardImg = document.querySelectorAll(".titleCardImg");
    const imgCardApi = new Array();
    const titleCardApi = new Array();

    allSpecificDataHome.forEach((element) => {
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

moreThanTenImg();
