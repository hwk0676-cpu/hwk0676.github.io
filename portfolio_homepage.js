// header 스크롤 시 투명 효과
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// 우측 상단 로고 클릭 시 페이지 새로고침
const logo = document.querySelector("header > a:first-child");

logo.addEventListener("click", () => {
  location.reload(); // 페이지 새로고침
});

// top button
const topBtn = document.querySelector(".top_bt");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // 50px 이상 스크롤하면 표시
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

// footer 애니메이션 부분
const item1 = document.querySelector(".footer_item1");
const item2 = document.querySelector(".footer_item2");

let footerAnimated = false;

window.addEventListener("scroll", () => {
  const trigger = email.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (trigger < windowHeight - 100 && !footerAnimated) {
    footerAnimated = true;

    // 1번 문장 먼저
    setTimeout(() => {
      item1.classList.add("show");
    }, 0);

    // 2번 문장 그 다음
    setTimeout(() => {
      item2.classList.add("show");
    }, 300);

    // 이메일 글자 마지막
    setTimeout(() => {
      spans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add("show");
        }, index * 80);
      });
    }, 700);
  }
});

// 이메일 부분 애니메이션
const email = document.getElementById("email");

// 1. 글자 하나씩 span으로 감싸기
const text = email.textContent;
email.textContent = "";

text.split("").forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char === " " ? "\u00A0" : char;
  email.appendChild(span);
});

const spans = email.querySelectorAll("span");

// 2. 스크롤 감지
window.addEventListener("scroll", () => {
  const trigger = email.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (trigger < windowHeight - 100) {
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add("show");
      }, index * 80); // 순차 딜레이
    });
  }
});
