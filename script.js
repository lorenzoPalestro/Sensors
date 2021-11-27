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
      <h2 style="text-align: center;">${sensor.description}</h2>
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
      // last four cards
let request = 0;
fetch("https://hf3xzw.deta.dev/")
  .then((r) => r.json())
  .then((body) => {
    for (let index = 4; index < 8; index++) {
      const sensor = JSONToSensor(body["sensors"][index]);

      let newCard = document.createElement("div");
      newCard.innerHTML = `
          <h2><span></span>${sensor.description}</h2>
          <h2><span>ID: </span>${sensor.id}</h2>
          <h2><span>lat: </span>${sensor.lat}</h2>
          <h2><span>lng: </span>${sensor.lng}</h2>
          <h2><span>place: </span>${sensor.place}</h2>
      
      <h2><span>readonly: </span>${sensor.readonly}</h2>
      
       <h2><span>state_code: </span>${sensor.state_code}</h2>
          <h2><span>value: </span>${sensor.value}</h2>  
      <div style=" width: 100%; margin-bottom: 10px; margin-top 20px;">
        <canvas id="myChart${index}"></canvas>
      </div>
      `;

      newCard.classList.add("card2");
      newCard.classList.add("hvr-grow", "hvr-round-corners");
      container2.appendChild(newCard);

      let labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //x
      let datas = [];                               //y

      for (let index = 0; index < 10; index++) {
        fetch("https://hf3xzw.deta.dev/")
          .then((r) => r.json())
          .then((body) => {
            const sensorLabel = JSONToSensor(body["sensors"][5]);
            request++;
            datas.push(sensorLabel.value);  //mette le temps nella y
            if (request == 40) {
              document.getElementById("spinner").style.display = "none";  
              document.getElementById("container2").style.display = "flex"; //tolgo lo spinner e mostro le altre card
            }
          });
      }
      //Proprietà grafiche
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Temperature",
            backgroundColor: "#f96d00",
            borderColor: "black",
            data: datas,
          },
        ],
      };

      const config = {
        type: "line",
        data: data,
        options: {
          responsive: true,
          lineTension: 0,
          scales: {
            y: {
              lineHeight: 3,
              ticks: {
                callback: function (value, index, values) {
                  return value + "°"; //gradi
                },
              },
            },
          },
        },
      };
      let nomeChart = "myChart" + index;  //inserire ogni grafico nella card
      const myChart = new Chart(document.getElementById(nomeChart), config);
    }
  });