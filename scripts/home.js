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
    console.log(AllData);
    return AllData;
  } catch (err) {
    console.error(`${err.message} 😐`);
  }
};

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
          { descriptionImg: [element?.description] },
          { urlDetailImg: [element?.urls?.at(0)?.url] },
        ]);
    });

    if (allSpecificDataHome.length < 18) {
      allSpecificDataHome.splice();
      moreThanTenImg();
    }

    console.log(allSpecificDataHome);
    const imgHome = document.querySelectorAll(".imgHome");
    const imgHomeSlicer = new Array();

    allSpecificDataHome.forEach((element) => {
      imgHomeSlicer.push(
        `${element.at(0).urlImg.at(0)}.${element.at(0).urlImg.at(1)}`
      );
    });

    imgHome.forEach((element, i) => {
      // console.log(element);
      element.src = imgHomeSlicer[i];
    });
  });
};

moreThanTenImg();
