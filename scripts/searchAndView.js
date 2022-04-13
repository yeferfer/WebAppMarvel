'use strict';

//Page Search
const pageSearch = document.querySelector('.page-search');
const goToPageHome = document.querySelector('.page-home');

//Button Home
const btnHome = document.querySelector('.btn-home');

//Button Search History
const btnHistory = document.querySelector('.btn-history');
const containerHistory = document.querySelector('.container-history');
const btnSearchHistory = document.querySelector('.btn-search-history');
const inputHistory = document.querySelector('.input-history');

//Button Config User and History
const btnCloseSession = document.querySelector('.btn-close-session');
const btnConfig = document.querySelector('.btn-config');
const btnClearHistory = document.querySelector('.btn-clear-history');
//Modal
const modalSearch = document.querySelector('.modal-search');
const overlaySearch = document.querySelector('.overlay-search');
const btnshowModalSearch = document.querySelector('.show-modal-search');

//Search
const searchCharacters = document.querySelector('.search-characters');
const btnSearchCharacter = document.querySelector('.btn-search-character');
const inputCharacter = document.querySelector('.input-character');

//loader
const loaderContainer = document.querySelector('.loader-container');

//Slider
const carrousel = document.querySelector('.container-slider');

//Card
const imgCardOne = document.querySelectorAll('.img-card-one');
const nameCardOne = document.querySelectorAll('.name-card-one');
const containerCard = document.querySelectorAll('.container-card');
const descriptionCardOne = document.querySelectorAll('.description-card-one');
const moreInformationCardOne = document.querySelectorAll(
  '.more-information-card-one'
);

//Function Hide
const hide = element => {
  element.classList.toggle('hidden');
};

//Come Back to Home page
btnHome.addEventListener('click', () => {
  hide(pageSearch);
  hide(goToPageHome);
  document.querySelector('.btn-page-login').addEventListener('click', () => {
    hide(pageSearch);
    hide(goToPageHome);
    hide(document.querySelector('.modal'));
    hide(document.querySelector('.overlay'));
  });
});

//Show History
btnHistory.addEventListener('click', () => {
  hide(containerHistory);
});

//Button Search History
btnSearchHistory.addEventListener('click', () => {
  inputCharacter.value = inputHistory.value;
  hide(containerHistory);
  hide(loaderContainer);
  clearInterval(passCarousel);
  carousels();
});

//Close Session
btnCloseSession.addEventListener('click', () => {
  location.reload();
});

//Clear History
btnClearHistory.addEventListener('click', () => {
  document.querySelectorAll('.history-items').forEach(element => {
    element.remove();
  });
});

//Fuction Open Modal Config
const openModalSearch = function () {
  hide(modalSearch);
  hide(overlaySearch);
};

//Fuction Close Modal Config
const closeModalSearch = function () {
  hide(modalSearch);
  hide(overlaySearch);
};

//Open Modal Search
btnshowModalSearch.addEventListener('click', () => {
  openModalSearch();
});

//Close Modal Search
overlaySearch.addEventListener('click', () => {
  closeModalSearch();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalSearch.classList.contains('hidden')) {
    closeModalSearch();
    hide(searchCharacters);
  }
});

//Button Search Characters
btnSearchCharacter.addEventListener('click', () => {
  const html = `<option class="history-items" value="${inputCharacter.value}"/>`;
  document.getElementById('character').insertAdjacentHTML('afterbegin', html);
  hide(loaderContainer);
  clearInterval(passCarousel);
  carousels();
  searchCharacters.style.margin = '5% auto';
});

//Fuction Get Info API
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

//Fuction Carrousel
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

  //Pass Image
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
