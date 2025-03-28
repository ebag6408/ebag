document.addEventListener("DOMContentLoaded", () => {
  // 색상 세트 정의 (라이트/다크 모드)
  const barColorsLight = {
    project: "#A86AB3",
    product: "#C8B4D9",
  };

  const barColorsDark = {
    project: "#7c3aed",
    product: "#a16ae8",
  };

  const doughnutColorsLight = ["#A86AB3", "#C8B4D9"]; // 라이트 모드에서의 색상
  const doughnutColorsDark = ["#7c3aed", "#a16ae8"]; // 다크 모드에서의 색상 (따뜻한 핑크와 청록색)

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
            datalabels: {
              anchor: "center",
              align: "center",
            },
          },
        ],
      },
      options: {
        borderWidth: 0,
        cutout: "80%",
        circumference: "270",
        rotation: 225,
        borderRadius: 1000,
        spacing: -2,
        plugins: {
          legend: { position: "bottom", boxWidth: 20 },
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
      barChartInstance.data.datasets[0].backgroundColor = newColors.project;
      barChartInstance.data.datasets[1].backgroundColor = newColors.product;
      barChartInstance.update();
    }
  }

  // 다크 모드 토글 시 도넛 차트 색상 업데이트 함수
  function updateDoughnutChartColors() {
    if (doughnutChartInstance) {
      const newColors = getDoughnutColors();
      doughnutChartInstance.data.datasets[0].backgroundColor = newColors;
      doughnutChartInstance.update();
    }
  }

  // SortableJS 라이브러리 추가 (CDN)
  const loadSortableJS = () => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js";
    script.onload = enableDragAndDrop;
    document.head.appendChild(script);
  };

  // 드래그앤드롭 활성화 함수
  const enableDragAndDrop = () => {
    const dashboardGrid = document.querySelector(".dashboard-grid");
    new Sortable(dashboardGrid, {
      animation: 150,
      ghostClass: "dragging",
    });
  };

  // DOM 로드 후 라이브러리 불러오기
  loadSortableJS();
});

//드앤드 스타일수정
document.addEventListener("DOMContentLoaded", () => {
  const dashboardGrid = document.querySelector(".dashboard-grid");

  Sortable.create(dashboardGrid, {
    animation: 300, // 애니메이션 지속 시간 증가
    ghostClass: "sortable-ghost", // 드래그 중 스타일 클래스
    dragClass: "sortable-drag", // 드래그하는 동안 적용되는 클래스
    chosenClass: "sortable-chosen", // 선택된 상태의 클래스
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const notifications = document.querySelectorAll(".notification");
  let currentIndex = 0;

  function updateNotifications() {
    notifications.forEach((noti, index) => {
      if (index === currentIndex) {
        noti.classList.add("active");
        noti.classList.remove("inactive");
      } else {
        noti.classList.add("inactive");
        noti.classList.remove("active");
      }
    });
  }

  // 마우스 휠로 전환
  document
    .querySelector(".notifications")
    .addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        currentIndex = (currentIndex + 1) % notifications.length;
      } else {
        currentIndex =
          (currentIndex - 1 + notifications.length) % notifications.length;
      }
      updateNotifications();
    });

  // 일정 시간마다 자동 변경 (3초마다)
  setInterval(() => {
    currentIndex = (currentIndex + 1) % notifications.length;
    updateNotifications();
  }, 3000);

  updateNotifications();
});
