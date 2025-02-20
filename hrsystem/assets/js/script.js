document.addEventListener("DOMContentLoaded", () => {
  // 색상 세트 정의 (라이트/다크 모드)
  const barColorsLight = {
    project: "#b8e1a3", // 연두색
    product: "#FBD4A4", // 노란색
  };

  const barColorsDark = {
    project: "#81B29A", // 그린 계열
    product: "#FFD166", // 따뜻한 노란색
  };

  const doughnutColorsLight = ["#F4C2C2", "#b8e1a3"]; // 라이트 모드에서의 색상
  const doughnutColorsDark = ["#FF8A80", "#80CBC4"]; // 다크 모드에서의 색상 (따뜻한 핑크와 청록색)

  // 현재 테마에 따른 색상 선택 함수
  const getBarColors = () => {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? barColorsDark
      : barColorsLight;
  };

  const getDoughnutColors = () => {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? doughnutColorsDark
      : doughnutColorsLight;
  };

  // 다크 모드 토글 (부드러운 전환과 아이콘/텍스트 변경)
  const darkModeToggle = document.getElementById("darkModeToggle");
  darkModeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      darkModeToggle.textContent = "☀️ 라이트 모드";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      darkModeToggle.textContent = "🌙 다크 모드";
    }
    // 테마 변경 후 차트 색상 업데이트
    updateBarChartColors();
    updateDoughnutChartColors();
  });

  // 모바일 메뉴 토글 (사이드바 애니메이션)
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".sidebar");
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // 도넛 차트 - 연차 기록
  let doughnutChartInstance;
  const doughnutCanvas = document.getElementById("doughnutChart");
  if (doughnutCanvas) {
    const doughnutCtx = doughnutCanvas.getContext("2d");
    const currentDoughnutColors = getDoughnutColors();
    doughnutChartInstance = new Chart(doughnutCtx, {
      type: "doughnut",
      data: {
        labels: ["사용한 연차", "남은 연차"],
        datasets: [
          {
            data: [10, 5],
            backgroundColor: currentDoughnutColors,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "60%",
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }

  // 막대 차트 - 성과
  let barChartInstance;
  const barCanvas = document.getElementById("barChart");
  if (barCanvas) {
    const barCtx = barCanvas.getContext("2d");
    const currentBarColors = getBarColors();
    barChartInstance = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "Project Team",
            data: [40, 50, 30, 60, 55],
            backgroundColor: currentBarColors.project,
          },
          {
            label: "Product Team",
            data: [35, 45, 20, 50, 50],
            backgroundColor: currentBarColors.product,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }

  // 다크 모드 토글 시 막대 차트 색상 업데이트 함수
  function updateBarChartColors() {
    if (barChartInstance) {
      const newColors = getBarColors();
      // 데이터셋의 색상 업데이트
      barChartInstance.data.datasets[0].backgroundColor = newColors.project;
      barChartInstance.data.datasets[1].backgroundColor = newColors.product;
      // 차트 새로 렌더링
      barChartInstance.update();
    }
  }

  // 다크 모드 토글 시 도넛 차트 색상 업데이트 함수
  function updateDoughnutChartColors() {
    if (doughnutChartInstance) {
      const newColors = getDoughnutColors();
      // 도넛 차트 색상 업데이트
      doughnutChartInstance.data.datasets[0].backgroundColor = newColors;
      // 차트 새로 렌더링
      doughnutChartInstance.update();
    }
  }
});
