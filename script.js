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
let carouselImg;
const carousels = () => {
  getData(inputCharacter.value).then((res) => {
    //Get All Img
    const allImg = res
      .map((element) => {
        if (
          element?.thumbnail?.path ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
        )
          return ["NaN"];
        return [element?.thumbnail?.path, element?.thumbnail?.extension];
      })
      .filter((i) => i[0] !== "NaN");

    //Get All Name
    const allName = res
      .map((element) => {
        if (
          element?.thumbnail?.path ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
        )
          return ["NaN"];
        return [element?.name];
      })
      .filter((i) => i[0] !== "NaN");

    //pass image
    let cont = 0;
    carouselImg = setInterval(() => {
      try {
        if (cont === allImg.length) cont = 0;
        const img = `${allImg[cont][0]}.${allImg[cont][1]}`;
        const name = allName[cont];

        carousel1.src = img;
        carousel1Name.textContent = name;
        carousel1.classList.add("carousel");
        cont++;
      } catch (err) {
        console.error(`${err.message} 😐`);
        clearInterval(carouselImg);
      }
    }, 3000);
  });
};

//Button Search Characters
btnSearchCharacter.addEventListener("click", () => {
  clearInterval(carouselImg);
  carousels();
});
