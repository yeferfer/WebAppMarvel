'use strict';

//HTML Components

//Pages
const pageSearch = document.querySelector('.pageSearch');

//BtnPageSearch
const btnBack = document.querySelector('.btnHome');
const btnHistory = document.querySelector('.btnHistory');
const btnConfig = document.querySelector('.btnConfig');

//Search
const searchCharacters = document.querySelector('.searchCharacters');
const btnSearchCharacter = document.querySelector('.btnSearchCharacter');
const inputCharacter = document.querySelector('.inputCharacter');

//loader
const loaderContainer = document.querySelector('.loader-container');

//Slider
const carrousel = document.querySelector('.container--slider');

//Card
const imgCardOne = document.querySelectorAll('.img-card-one');
const nameCardOne = document.querySelectorAll('.name-card-one');
const containerCard = document.querySelectorAll('.container-card');
const descriptionCardOne = document.querySelectorAll('.description-card-one');
const moreInformationCardOne = document.querySelectorAll(
  '.more-information-card-one'
);

//Modal
const modalSearch = document.querySelector('.modalSearch');
const overlaySearch = document.querySelector('.overlaySearch');
const btnshowModalSearch = document.querySelector('.show-modal-Search');

//come back to Home page
btnBack.addEventListener('click', () => {
  document.querySelector('.pageSearch').classList.add('hidden');
  document.querySelector('.pageHome').classList.remove('hidden');
  document.querySelector('.btnPageLogin').addEventListener('click', () => {
    document.querySelector('.pageSearch').classList.remove('hidden');
    document.querySelector('.pageHome').classList.add('hidden');
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
  });
});

const btnCloseSession = document.querySelector('.btnCloseSession');

btnCloseSession.addEventListener('click', () => {
  location.reload();
});
//Fuction Block KeyCode
const openModalSearch = function () {
  modalSearch.classList.remove('hidden');
  overlaySearch.classList.remove('hidden');
  let keys = {};
  window.addEventListener(
    'keydown',
    function (e) {
      keys[e.keyCode] = true;
      switch (e.keyCode) {
        case 40:
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
};

//Fuction Close Modal and Reset Cases
const closeModalSearch = function () {
  modalSearch.classList.add('hidden');
  overlaySearch.classList.add('hidden');
};

//Open modal
btnshowModalSearch.addEventListener('click', openModalSearch);

//Close Modal
overlaySearch.addEventListener('click', closeModalSearch);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalSearch.classList.contains('hidden')) {
    closeModalSearch();
  }
});

// btnConfig.addEventListener('click', () => {
//   modalSearch.classList.remove('hidden');
// });

//This is the function that retrieves the information in the API for the carousels
const getData = async function (character) {
  try {
    const request = await fetch(
      `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${character}&ts=1&apikey=35d5da2d7a9b9cc5a68d34e8c1f0b8f2&hash=701d981312a61e2d8957fa50bb9b8b60`
    );
    const AllData = await request.json().then(data => data?.data?.results);
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
  getData(inputCharacter.value).then(res => {
    res.forEach(element => {
      if (
        element?.thumbnail?.path !==
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
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
      for (let i = 0; i < imgCardOne.length; i++) {
        imgCardOne[i].src = img;
        nameCardOne[i].textContent = asdName;
        descriptionCardOne[i].textContent = asdDescription;
        moreInformationCardOne[i].textContent = 'Show More';
        moreInformationCardOne[i].href = asdUrl;
      }

      //Show Card and Loader
      loaderContainer.classList.add('hidden');
      carrousel.classList.remove('hidden');
      containerCard[0].classList.remove('hidden');

      cont++;
    } catch (err) {
      console.error(`${err.message} 😐`);
      clearInterval(passCarousel);
    }
  }, 5000);
};

//Button Search Characters
btnSearchCharacter.addEventListener('click', () => {
  loaderContainer.classList.remove('hidden');
  clearInterval(passCarousel);
  carousels();
  searchCharacters.style.margin = '5% auto';
});
