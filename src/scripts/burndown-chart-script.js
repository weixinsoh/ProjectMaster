Chart.defaults.font.size = 20;    

    // setup 
    const data = {
      labels: ['2023-09-25', '2023-09-26', '2023-09-27', '2023-09-28', '2023-09-29', '2023-09-30'], //x - axis(date)
      datasets: [{
        label: 'Actual Velocity',
        data: [10, 8, 8, 9, 7, 7],
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
        ]
      },
      {
        label: 'Ideal Velocity',
        data: [10, 9, 8, 7, 6, 6],
        backgroundColor:'rgba(0, 0, 0, 0.2)',
        borderColor:'rgba(0, 0, 0, 1)',
        borderWidth: 1,
      }]
    };

    // config 
    const config = {
      type: 'line',
      data,
      options: {
        scales: {
            x:  {
                title:{
                    display: true,
                    text: 'Timeline',
                    
                },
                type: 'time',
                time:{
                    unit: 'day'
                }
            },
            y: {
                title:{
                    display: true,
                    text: 'Task',
                    fontSize: 150,
                },
                beginAtZero: true,
                grid:{
                    display: false,
                    drawBorder: false
                }
            }
        }
      }
    };

    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );

    // Instantly assign Chart.js version
    const chartVersion = document.getElementById('chartVersion');
    chartVersion.innerText = Chart.version;