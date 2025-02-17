document.addEventListener("DOMContentLoaded", function () {
  // 막대 차트
  const barCtx = document.getElementById("barChart").getContext("2d");
  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Project Team",
          data: [40, 50, 30, 60, 55],
          backgroundColor: "#7b68ee",
        },
        {
          label: "Product Team",
          data: [35, 45, 20, 50, 50],
          backgroundColor: "#a984f7",
        },
      ],
    },
  });

  // 도넛 차트
  const doughnutCtx = document.getElementById("doughnutChart").getContext("2d");
  new Chart(doughnutCtx, {
    type: "doughnut",
    data: {
      labels: ["사용한 연차", "남은 연차"],
      datasets: [
        {
          data: [10, 5],
          backgroundColor: ["#7b68ee", "#c2a2ff", "#a984f7"],
        },
      ],
    },
    options: {
      responsive: false,
      cutout: "60%", // 도넛 차트의 중앙 빈 공간 크기 조절
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
});
