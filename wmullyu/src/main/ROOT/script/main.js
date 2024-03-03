"use strict";

function observeElements(selector, animationClass, nextSelector) {
    const elements = document.querySelectorAll(selector);
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.5] // 뷰포트 진입과 뷰포트 벗어남을 모두 관찰
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                if (nextSelector) {
                    setTimeout(() => observeElements(nextSelector, animationClass), 500); // 0.5초 후에 실행
                }
            } else {
                // 뷰포트를 벗어나면 애니메이션 클래스 제거
                entry.target.classList.remove(animationClass);
            }
        });
    }, options);

    elements.forEach(element => observer.observe(element));
}

document.addEventListener('DOMContentLoaded', function() {
    observeElements('.image-banner', 'fade-in-up', '.text-banner');
});

//데이터불러오기
const setItemBtns = document.querySelectorAll('.h-item-article > article > span');


setItemBtns.forEach((btns)=>{
	btns.addEventListener('click', (btn)=>{
		itemMode = btn.currentTarget.dataset.query;
		modeCode = btn.currentTarget.dataset.query;
		const scrollSection = document.querySelector('.scroll-img-data-reset');
		if(scrollSection){
			scrollSection.parentNode.removeChild(scrollSection);
		}
		fetchData(itemMode)//imgScrollData.js
	});
});