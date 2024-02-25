"use strict";

document.addEventListener('DOMContentLoaded', () => {
	if(itemMode != undefined){
	    fetchData();
	    window.addEventListener('scroll', () => {
	        // 페이지 바닥에서 100px 전에 fetchData 함수 호출
	        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
	            fetchData();
	        }
	    });
    }
});

async function fetchData() {// 새로운 콘텐츠를 로드하는 로직
	// 예: API 호출 등
	let data;
	let setHTML = '';
	try {
		data = await getFetch(`/item/itemExposureList?mode=${itemMode}&code=${modeCode}`);
		// 임시로 새 콘텐츠를 페이지에 추가하는 예시
		
		const newContent = document.createElement('section');
		setHTML = ``
		data.forEach((d, i)=>{
			if(i == 0){
				setHTML += `
					<section class="item-exposure main-layout-width">
						<section class="exposure-section">
							<section class="exposure-title">
								<article><span>최 근 등 록 상 품</span></article>
							</section>
							<section class="exposure-item-wrapper scroll-img-data">
				`;
			}
            let imgPre = d.nameEng.toLowerCase();
            let imgName = `${imgPre}_${d.code}`;
            let itemName = d.item_name_reg;
            itemName = itemName.length > 25 ? itemName.substring(0, 25) + '...' : itemName;
			setHTML += `
	            <section class="item-wrapper item-wrapper-scroll">
	                <section class="item-img" data-itemdata="${JSON.stringify(d)}">
	                    <img src="https://www.wmullyu.co.kr/images/1000/${imgName}.jpg">
	                </section>
	                <section class="item-name">
	                    ${itemName}
	                </section>
	                <section class="item-price">
	                    <span style="text-decoration:line-through;">${getCurrentMony(d.item_retailPrice)}</span> -> <b style="color:#dc3545;">${getCurrentMony(d.item_purchasePrice)}</b>
	                </section>
	            </section>

			`;
			if(i+1 == data.length){
				setHTML += `
					        </section>
					    </section>
					</section>
				`;
			}
		});
		newContent.classList.add('scroll-img-data-reset');
		newContent.innerHTML = setHTML;
		mainSection.appendChild(newContent);
		
	} catch (error) {
		console.error('Error setting items:', error);
	}
}
