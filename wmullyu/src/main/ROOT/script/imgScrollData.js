"use strict";

document.addEventListener('DOMContentLoaded', () => {
  mainSection.addEventListener('scroll', () => {// 스크롤 이벤트 리스너 추가
    
    let documentHeight = document.body.scrollHeight;// 문서의 높이
    
    let currentScroll = window.innerHeight + window.scrollY;// 현재 스크롤 위치
    console.log(documentHeight);
    
    if (documentHeight - currentScroll < 100) {// 스크롤이 거의 바닥에 도달했는지 확인 (여기서는 바닥에서 100px 이내)
      
      fetchData();// 새로운 콘텐츠 로드
    }
  });

  
  //fetchData(mainSection);
  // 초기 콘텐츠 로드
});

function fetchData() {// 새로운 콘텐츠를 로드하는 로직
  const mainLogged = mainSection.querySelector('.mainLogged');
  mainLogged.style.display='none';
  // 예: API 호출 등
  console.log('새로운 콘텐츠 로드');
  
  // 임시로 새 콘텐츠를 페이지에 추가하는 예시
  const newContent = document.createElement('div');
  newContent.innerText = '새 콘텐츠';
  mainSection.appendChild(newContent);
}
