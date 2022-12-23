const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const getvote = document.getElementById("btn-getvote");
const goToGoogle = document.getElementById("goToGoogle");

//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: "un menu" },
  { minDegree: 31, maxDegree: 90, value: "perdu 😞" },
  { minDegree: 91, maxDegree: 150, value: "un burger" },
  { minDegree: 151, maxDegree: 210, value: "10% de réduction" },
  { minDegree: 211, maxDegree: 270, value: "perdu 😞" },
  { minDegree: 271, maxDegree: 330, value: "une boisson chaude" },
  { minDegree: 331, maxDegree: 360, value: "perdu 😞" },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#984F4F",
  "black",
  "#984F4F",
  "black",
  "#984F4F",
  "black",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  //🌮🍟🍔🌭🍕🥪🫔🍿
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ["🎁", " 🎁", "🎁", "🎁", "🎁", "🎁"],
    //labels: ["Pizza \n Hut", "Pizza \n Hut", "Pizza \n Hut", "Pizza \n Hut", "Pizza \n Hut", "Pizza \n Hut"],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
const valueGenerator = (angleValue) => {
  localStorage.removeItem("isActive");
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      if(i.value === "perdu 😞"){
        finalValue.innerHTML = `<p>Vous êtes tomber sur une boite vide 😞 desoler</p>`;
      }else{
        finalValue.innerHTML = `<p>Vôtre boite contient ( ${i.value} ) 🥳</p>`;
        finalValue.innerHTML += `<center>
        <div class="bg-red-500 w-3/6 h-9 mt-2 rounded-full flex items-center justify-center">
          <span class="text-sm text-white">Reclamer son gain</span>
        </div>
      </center>`;
      }
      
      spinBtn.disabled = false;
      break;
    }
  }
};

let count = 0;
let resultValue = 101;
const isActive = localStorage.getItem("isActive");
if (isActive) {
  spinBtn.style.display = "block";
  getvote.style.display = "none";
}
goToGoogle.addEventListener("click", () => {
  spinBtn.style.display = "block";
  getvote.style.display = "none";
  localStorage.setItem("isActive", true);
})

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;

  finalValue.innerHTML = `<p>Bonne chance !!!</p>`;

  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;

    myChart.update();

    if (myChart.options.rotation >= 360) {
      count += 1;

      resultValue -= 5;

      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      console.log()
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
