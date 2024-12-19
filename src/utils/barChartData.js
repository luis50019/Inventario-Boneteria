export const barData = {
  labels : ["Lunes","Martes","Miercoles","Jueves","Viernes"],
  datasets :[
    {
      data:[1200,500,400,300,800],
      backgroundColor:["rgb(0,0,0)"],
      borderColor:["rgb(247,140,148)"],
      borderWidth:5,
    }
  ]
}

export const options = {
  plugins: {
    legend: {
      display: true,
      labels: {
        boxWidth: 25,
        boxHeight: 25,
        padding: 5,
        font: {
          size: 12,
        },
      },
    },
  },
  scales: {
    x: {
      barPercentage: 5,
      categoryPercentage: 0.8,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
        },
        color: "#000",
        maxRotation: 90,
        minRotation: 90,
      },
    },
    y: {
      grid: {
        display: true,
      },
      ticks: {
        callback: (value) => `$${value}`,
        font: {
          size: 12,
        },
        color: "#000",
      },
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};