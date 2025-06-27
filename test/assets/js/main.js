document.addEventListener("DOMContentLoaded", function () {
  // ===== Number Animate Function =====
  function animateNumberElement(element, target, duration) {
    let start = parseInt(element.textContent.replace(/,/g, "")) || 0;
    const range = target - start;
    const steps = Math.abs(range);
    const stepTime = Math.max(duration / (steps || 1), 10);
    let current = start;
    const increment = range / (duration / stepTime);

    const timer = setInterval(() => {
      current += increment;
      if (
        (range > 0 && current >= target) ||
        (range < 0 && current <= target)
      ) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, stepTime);
  }

  // ===== Visitor Count =====
  function updateVisitorCount() {
    const min = 850000;
    const max = 970000;
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    animateNumberElement(document.getElementById("visitor-count"), count, 800);
  }
  setInterval(updateVisitorCount, 4000);
  updateVisitorCount();

  // ===== Jackpot (วิ่งทุก 1 วิ) =====
  let jackpotAmount =
    Math.floor(Math.random() * (40000000 - 1000000 + 1)) + 1000000;
  function updateJackpot() {
    const change = Math.floor(Math.random() * 1000) + 100;
    jackpotAmount += change;
    animateNumberElement(
      document.getElementById("jackpot-amount"),
      jackpotAmount,
      900
    );
    document.getElementById("time-update").textContent =
      new Date().toLocaleString("th-TH");
  }
  setInterval(updateJackpot, 1000);
  updateJackpot();

  // ===== Countdown Timer =====
  let countdownTime = 30 * 60;
  function updateCountdown() {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    const timerEl = document.getElementById("countdown-timer");
    timerEl.textContent =
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");

    if (countdownTime <= 60) {
      timerEl.style.color = "#ff0000";
      timerEl.style.animation = "blinker 1s step-start infinite";
    } else {
      timerEl.style.color = "";
      timerEl.style.animation = "";
    }
    if (countdownTime > 0) countdownTime--;
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ===== Fake Transaction List =====
  const transactionContainer = document.getElementById("transaction-container");
  const fakeNames = [
    "มณีกานต์",
    "สมศักดิ์",
    "สุภาพร",
    "กิตติ",
    "อนงค์",
    "ปรีชา",
    "มาลี",
    "วุฒิชัย",
    "ธนพล",
    "ณัฐวุฒิ",
  ];
  const statusClass = ["transaction-completed", "transaction-pending"];

  function addFakeTransaction() {
    const name = fakeNames[Math.floor(Math.random() * fakeNames.length)];
    const phone =
      "0" +
      Math.floor(Math.random() * 90 + 10) +
      "-XXX-" +
      Math.floor(Math.random() * 9000 + 1000);
    const amount = Math.floor(Math.random() * (100000 - 15000 + 1)) + 15000;
    const date = new Date();
    const dateStr =
      date.toLocaleDateString("th-TH") + " " + date.toLocaleTimeString("th-TH");
    const status = Math.random() > 0.3 ? "โอนแล้ว ✔️" : "กำลังโอน... ⏳";
    const statusStyle = status.includes("✔️") ? statusClass[0] : statusClass[1];

    const div = document.createElement("div");
    div.className = `${statusStyle} new-transaction`;
    div.innerHTML = `
      <div class="transaction-left">
        <strong>${name} (${phone})</strong>
        ${dateStr}
        <div class="ref">REF#${Math.floor(Math.random() * 999999)}</div>
      </div>
      <div class="transaction-right">
        <div class="amount">${amount.toLocaleString()} ฿</div>
        <span class="status">${status}</span>
      </div>
    `;
    transactionContainer.prepend(div);
    if (transactionContainer.children.length > 6) {
      transactionContainer.removeChild(transactionContainer.lastChild);
    }
  }
  setInterval(addFakeTransaction, 3000);
  addFakeTransaction();

  // ==== Fake Review Sliding Queue ====
  const reviewList = document.getElementById("review-list");
  const fakeReviews = [
    {
      name: "ชาญยุทธ",
      image: "images/user1.jpg",
      stars: 5,
      comment: "สายฟรีมีรี โอกาสได้เล่นพร้อมโบนัสค่ะ",
    },
    {
      name: "จิรศักดิ์",
      image: "images/user2.jpg",
      stars: 4,
      comment: "ไม่ใช่บอทนะ แต่ได้เงินทุกครั้งที่เล่น!",
    },
    {
      name: "ณัฐธิดา",
      image: "images/user3.jpg",
      stars: 5,
      comment: "บริการดีแอดมินตอบไว แนะนำเลยค่ะ",
    },
    {
      name: "มานี",
      image: "images/user4.jpg",
      stars: 4,
      comment: "แนะนำเพื่อนมาได้โบนัสจริงๆ คุ้มมาก",
    },
    {
      name: "วุฒิชัย",
      image: "images/user5.jpg",
      stars: 5,
      comment: "เว็บนี้มั่นใจเลย ถอนจริง!",
    },
    {
      name: "ธนพล",
      image: "images/user6.jpg",
      stars: 4,
      comment: "ฝากถอนไวสุด ๆ 👍",
    },
    {
      name: "อนงค์",
      image: "images/user7.jpg",
      stars: 5,
      comment: "ได้กำไรทุกวัน ประทับใจมากค่ะ",
    },
    {
      name: "ปรีชา",
      image: "images/user8.jpg",
      stars: 3,
      comment: "ระบบเสถียรดี เล่นง่าย",
    },
    {
      name: "สุภาพร",
      image: "images/user9.jpg",
      stars: 4,
      comment: "ชอบตรงโบนัสแตกบ่อย",
    },
    {
      name: "สมศักดิ์",
      image: "images/user10.jpg",
      stars: 5,
      comment: "ได้เงินจริง ไม่มีโกง ✅",
    },
  ];

  let reviewIndex = 0;
  const visibleReviews = 5;

  // ===== Render เริ่มต้น 5 คน =====
  for (let i = 0; i < visibleReviews; i++) {
    addReview(fakeReviews[(reviewIndex + i) % fakeReviews.length], false);
  }

  function addReview(review, withAnimation = true) {
    const li = document.createElement("li");
    li.innerHTML = `
    <img src="${review.image}" alt="${review.name}" class="profile-pic">
    <div class="review-content">
      <strong>${review.name}</strong><br>
      <span class="review-stars">${"★".repeat(review.stars)}${"☆".repeat(
      5 - review.stars
    )}</span><br>
      ${review.comment}
    </div>
  `;
    if (withAnimation) li.classList.add("slide-in");
    reviewList.appendChild(li);
  }

  function nextReviewSlide() {
    const firstLi = reviewList.firstElementChild;
    if (firstLi) {
      firstLi.classList.add("slide-out");
      setTimeout(() => {
        reviewList.removeChild(firstLi);
        const nextReview = fakeReviews[reviewIndex % fakeReviews.length];
        addReview(nextReview, true);
        reviewIndex = (reviewIndex + 1) % fakeReviews.length;
      }, 400); // Animation out duration
    }
  }

  setInterval(nextReviewSlide, 3000);

  // ===== Most Online Number per Game =====
  const gameTargets = [
    { id: "game-count-1", min: 5000, max: 9000 },
    { id: "game-count-2", min: 4000, max: 8000 },
    { id: "game-count-3", min: 3000, max: 7000 },
    { id: "game-count-4", min: 1000, max: 5000 },
  ];

  function updateGameOnlineNumbers() {
    gameTargets.forEach((game) => {
      const obj = document.getElementById(game.id);
      if (obj) {
        const target =
          Math.floor(Math.random() * (game.max - game.min + 1)) + game.min;
        animateNumberElement(obj, target, 800);
      }
    });
  }
  setInterval(updateGameOnlineNumbers, 4000);
  updateGameOnlineNumbers();
});
