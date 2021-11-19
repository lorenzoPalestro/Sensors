const container = document.getElementById("container");

// api url
const api_url =
    "https://hf3xzw.deta.dev/";

// Defining async function
fetch(api_url)
  .then((r) => r.json()) // (1)
  .then((body) => {
    for (let index = 0; index < 8; index++) {
      const sensor = JSONToSensor(body["sensors"][index]);

      let newCard = document.createElement("div");
      newCard.classList.add("card");

      newCard.innerHTML = `<br>
      <h2><span style="font-weight: normal;">Description: </span>${sensor.description}</h2>
      <h2><span style="font-weight: normal;">ID: </span>${sensor.id}</h2>
      <h2><span style="font-weight: normal;">Lat: </span>${sensor.lat}</h2>
      <h2><span style="font-weight: normal;">Lng: </span>${sensor.lng}</h2>
      <h2><span style="font-weight: normal;">Place: </span>${sensor.place}</h2>
      <h2><span style="font-weight: normal;">Read Only: </span>${sensor.readonly}</h2>
      <h2><span style="font-weight: normal;">State Code: </span>${sensor.state_code}</h2>
      <h2><span style="font-weight: normal;">Value: </span>${sensor.value}</h2>
      `;
      container.appendChild(newCard);
    }
  });

fetch(api_url,)