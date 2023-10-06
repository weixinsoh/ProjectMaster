import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, get, child, onValue, update} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyACyBE4-v3Z5qL37njca-CaPUPXMHfzZbY",
    authDomain: "fit2101-team4.firebaseapp.com",
    databaseURL: "https://fit2101-team4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fit2101-team4",
    storageBucket: "fit2101-team4.appspot.com",
    messagingSenderId: "413420787548",
    appId: "1:413420787548:web:be8873c231ec4468845399"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const taskReference = ref(db, 'task/');
const sprintReference = ref(db, 'sprint/')

onValue(sprintReference, (snapshot) => {
  displayChart()
});

const urlParams = new URLSearchParams(window.location.search);
const receivedID = urlParams.get('id')

async function getDataSets() {
  try {
    const snapshot = await get(child(ref(db, "sprint"), `/${receivedID}`));
    const data = snapshot.val();

    // display header
    document.getElementById("sprint-header").innerHTML = "";
    const sprintHeader = document.getElementById("sprint-header")
    sprintHeader.classList = "d-flex justify-content-center"
    sprintHeader.style = "margin-top: 10px; align-items: baseline"
    sprintHeader.innerHTML = `
    <h2 style="display: inline-block; margin-left: 30px;">${receivedID}</h2>
    <span style="margin-left: 20px;">${data.status}</span>
    <span style="margin-left: 20px; font-size: 13px">( ${data.start} - ${data.end} )</span>
    `

    // get datasets
    const startDate = data.start
    const storyPoints = JSON.parse(data.story_points)
    const labels = Object.keys(storyPoints)

    const totalSprintEstimate = storyPoints[startDate];
    const totalDays = (new Date(data.end) - new Date(data.start)) / (1000 * 60 * 60 * 24)
    const idealIncrement = totalSprintEstimate / totalDays;
    let idealDataSet = [];
    for (let i = 0; i <= totalDays; i++) {
        idealDataSet.push(idealIncrement * i);
    }
    idealDataSet.reverse();

    const actualDataSet = Object.fromEntries(Object.entries(storyPoints).filter(([key]) => {
      const currentDate = new Date()
      const keyDate = new Date(key)
      return keyDate.getFullYear() < currentDate.getFullYear()
            || keyDate.getMonth() < currentDate.getMonth() 
            || (keyDate.getFullYear() === currentDate.getFullYear() 
                && keyDate.getMonth() === currentDate.getMonth() 
                && keyDate.getDate() <= currentDate.getDate())
    }));

    for (const key in actualDataSet) {
      if (actualDataSet[key] < 0) {
        const previousDate = new Date(new Date(key))
        previousDate.setDate(new Date(key).getDate() - 1)
        const year = previousDate.toLocaleString("default", { year: "numeric" });
        const month = previousDate.toLocaleString("default", { month: "2-digit" });
        const day = previousDate.toLocaleString("default", { day: "2-digit" });
        const formattedPreviousDate = year + "-" + month + "-" + day;
        console.log(formattedPreviousDate)
        actualDataSet[key] = actualDataSet[formattedPreviousDate]
        storyPoints[key] = storyPoints[formattedPreviousDate]
      }
    }
    update(ref(db, "sprint/" + receivedID), {
      story_points: JSON.stringify(storyPoints)
    })
    return [labels, idealDataSet, actualDataSet]

  } catch (error) {
    console.error(error);
    throw error; 
  }
}

function displayChart() {
  getDataSets().then(([labels, idealDataSet, actualDataSet]) => {
    const ctx = document.getElementById("burndown-chart").getContext("2d")
    if (Chart.getChart("burndown-chart")) {
      Chart.getChart("burndown-chart").destroy()
    }
    Chart.defaults.font.size = 14;    
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Actual Velocity',
              data: actualDataSet,
              borderColor: 'rgb(235, 52, 88)',
              fill: false
          },
          {
            label: 'Ideal Velocity',
            data: idealDataSet,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            fill: false
          }]
      },
      options: {
          plugins: {
            legend: {
              labels: {
                color: 'rgb(0, 0, 0)'
              }
            }
          },
          scales: {
              x: {
                  type: 'time',
                  time: {
                      unit: 'day',
                      displayFormats: {
                          day: 'LLL, dd'
                      }
                  },
                  position: 'bottom',
                  title: {
                      display: true,
                      text: 'Date',
                      color: 'rgb(0, 0, 0)'
                  },
                  ticks: {
                    color: 'rgb(0, 0, 0)',
                  },
                },
              y: {
                  beginAtZero: true,
                  position: 'left',
                  title: {
                      display: true,
                      text: 'Log Time Spent',
                      color: 'rgb(0, 0, 0)'
                  },
                  ticks: {color: 'rgb(0, 0, 0)'}
              }
          }
      }
    })
  })
}
