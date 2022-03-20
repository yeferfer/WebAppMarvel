//Esto es funcion que trae la informacion en la API para el carruseles de los comics
const getData = async function () {
  try {
    const request = await fetch(
      // Este es la direccion de la API para las series
      // "https://gateway.marvel.com:443/v1/public/series?ts=1&apikey=35d5da2d7a9b9cc5a68d34e8c1f0b8f2&hash=701d981312a61e2d8957fa50bb9b8b60"

      // Este es la direccion de la API para los comics
      "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=35d5da2d7a9b9cc5a68d34e8c1f0b8f2&hash=701d981312a61e2d8957fa50bb9b8b60"
    );
    const AllData = await request.json().then((data) => data?.data?.results);

    return AllData;
  } catch (e) {
    console.error(e.message);
  }
};

// Esto es la informacion de la API para mostar el carrusel de imegenes de las series
// const getData2 = async function () {
//   try {
//     const request = await fetch(
//       // este es de series
//       "https://gateway.marvel.com:443/v1/public/series?ts=1&apikey=35d5da2d7a9b9cc5a68d34e8c1f0b8f2&hash=701d981312a61e2d8957fa50bb9b8b60"

//       // este es de comics
//       // "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=35d5da2d7a9b9cc5a68d34e8c1f0b8f2&hash=701d981312a61e2d8957fa50bb9b8b60"
//     );
//     const AllData = await request.json().then((data) => data?.data?.results);

//     return AllData;
//   } catch (e) {
//     console.error(e.message);
//   }
// };

//Esto demuentra que el carruseles 1 sirve
getData().then((res) => {
  const allImg = res.map((element) => [
    element?.thumbnail?.path,
    element?.thumbnail?.extension,
  ]);

  let cont = 0;
  const car1 = setInterval(() => {
    try {
      if (cont === allImg.length) cont = 0;
      const img = `${allImg[cont][0]}.${allImg[cont][1]}`;
      document.querySelector(".imgprueba").src = img;

      //Esto no quiere cojer el Css toca revisarlo
      document.querySelector(".imgprueba").style.width = "50%";
      cont++;
    } catch (e) {
      console.error(e.message);
      clearInterval(car1);
    }
  }, 3000);
});

//Esto comprueba que se puen tener dos carruseles al mismo tiempo con async
// getData2().then((res) => {
//   console.log(res);
//   const allImg2 = res.map((element) => [
//     element?.thumbnail?.path,
//     element?.thumbnail?.extension,
//   ]);
//   let cont2 = 0;
//   const car2 = setInterval(() => {
//     try {
//       console.log("img2");
//       if (cont2 === allImg2.length) cont2 = 0;
//       const img = `${allImg2[cont2][0]}.${allImg2[cont2][1]}`;
//       document.querySelector(".imgprueba2").src = img;
//       //Esto no quiere cojer el Css toca revisarlo
//       document.querySelector(".imgprueba2").style.left = "50%";
//       cont2++;
//     } catch (e) {
//       console.error(e.message);
//       clearInterval(car2);
//     }
//   }, 3000);
//   console.log("Hola mundo");
// });
