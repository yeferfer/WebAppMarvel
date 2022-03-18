const getData = async function () {
  const request = await fetch(
    "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=35d5da2d7a9b9cc5a68d34e8c1f0b8f2&hash=701d981312a61e2d8957fa50bb9b8b60"
  );
  const data = await request.json().then((data) => data?.data?.results);
  console.log(data[2].images[0], "jpg");
  document.querySelector(
    ".imgprueba"
  ).src = `${data[2].images[0].path}.${data[2].images[0].extension}`;
};

getData();
