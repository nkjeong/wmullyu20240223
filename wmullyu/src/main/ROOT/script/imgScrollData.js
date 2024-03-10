"use strict";

async function fetchData(title) {// 새로운 콘텐츠를 로드하는 로직
	const mainLogged = mainSection.querySelector('.mainLogged');
	mainLogged.style.display='none';
	let data;
	let setHTML = '';
	if(title === 'all'){
		title = '전체상품';
	}else if(title === 'new'){
		title = '최근등록상품(7일)';
	}else if(title === 'outOfStock'){
		title = '품절상품';
	}else if(title === 'discontinued'){
		title = '단종상품';
	}
	try {
		data = await getFetch(`/item/itemExposureList?mode=${itemMode}&code=${modeCode}`);
		// 임시로 새 콘텐츠를 페이지에 추가하는 예시
		
		const newContent = document.createElement('section');
		setHTML = ``;
				setHTML += `
					<section class="item-exposure main-layout-width">
						<section class="exposure-section">
							<section class="exposure-title">
								<article><span>${title}</span></article>
							</section>
							<section class="exposure-item-wrapper scroll-img-data">
				`;
		if(data.length === 0){
			setHTML += `
				검색된 데이터가 없습니다.
			`;
		}else{
			data.forEach((d)=>{
	            let imgPre = d.nameEng.toLowerCase();
	            let imgName = `${imgPre}_${d.code}`;
	            let itemName = d.item_name_reg;
	            itemName = itemName.length > 25 ? itemName.substring(0, 25) + '...' : itemName;
				setHTML += `
		            <section class="item-wrapper item-wrapper-scroll">
		                <section class="item-img" data-itemdata='${JSON.stringify(d)}'>
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
			});
		}
				setHTML += `
					        </section>
					    </section>
					</section>
				`;
		newContent.classList.add('scroll-img-data-reset');
		newContent.innerHTML = setHTML;
		mainSection.appendChild(newContent);
        const itemBtns = mainSection.querySelectorAll('.item-img');
        itemBtns.forEach((btns)=>{
			btns.addEventListener('click',(btn)=>{
				const data = JSON.parse(btn.currentTarget.dataset.itemdata);
				printData(data);
			});
		});
	} catch (error) {
		console.error('Error setting items:', error);
	}
}
