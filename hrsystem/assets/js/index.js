// 1. 개인 근태 현황 - 라인 차트 (출근 추세)
const ctx1 = document.getElementById("attendanceTrendChart").getContext("2d");
const attendanceTrendChart = new Chart(ctx1, {
  type: "line",
  data: {
    labels: ["월", "화", "수", "목", "금"],
    datasets: [
      {
        label: "근무 시간 (시간)",
        data: [8, 8.5, 8, 7.5, 8],
        borderColor: "#3c8dbc",
        backgroundColor: "rgba(60, 141, 188, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
    plugins: {
      legend: { display: false },
    },
  },
});

// 2. 휴가 관리 - 도넛 차트
const ctx2 = document.getElementById("vacationChart").getContext("2d");
const vacationChart = new Chart(ctx2, {
  type: "doughnut",
  data: {
    labels: ["남은 휴가", "사용한 휴가"],
    datasets: [
      {
        data: [12, 5],
        backgroundColor: ["#36A2EB", "#FF6384"],
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

// 8. 실시간 채팅 모달 기능 구현
const openChatButton = document.getElementById("openChat");
const chatModal = document.getElementById("chatModal");
const closeChat = document.getElementById("closeChat");
const chatToggle = document.getElementById("chatToggle");
const sendChat = document.getElementById("sendChat");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

// 채팅 열기 함수
function openChat() {
  chatModal.style.display = "block";
}
openChatButton.addEventListener("click", openChat);
chatToggle.addEventListener("click", openChat);

// 채팅 닫기
closeChat.addEventListener("click", function () {
  chatModal.style.display = "none";
});

// 채팅 메시지 전송
sendChat.addEventListener("click", function () {
  const message = chatInput.value.trim();
  if (message !== "") {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.style.marginBottom = "10px";
    chatBody.appendChild(messageElement);
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});
