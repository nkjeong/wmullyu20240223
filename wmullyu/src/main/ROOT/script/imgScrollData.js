"use strict";
let orderBy = 'registrationDate';
let inOrder = 'DESC';
// JavaScript 비동기 데이터 로딩 함수
async function fetchData(title, nowPage=0, nowBlock=0) {
    const mainLogged = mainSection.querySelector('.mainLogged');
    const loadingMessage = document.getElementById('loadingMessage'); // 로딩 메시지 요소 선택
    mainLogged.style.display = 'none';
    loadingMessage.style.display = 'flex'; // 데이터 로딩 시작시 로딩 메시지 보이기

    let data;
    let setHTML = '';
    if (title === 'all') {
        title = '전체상품';
    } else if (title === 'new') {
        title = '최근등록상품(7일)';
    } else if (title === 'outOfStock') {
        title = '품절상품';
    } else if (title === 'discontinued') {
        title = '단종상품';
    }
    
    try {
        data = await getFetch(`/item/itemExposureList?mode=${itemMode}&code=${modeCode}&orderBy=${orderBy}&inOrder=${inOrder}`);
        const newContent = document.createElement('section');
        setHTML = `
            <section class="item-exposure main-layout-width">
                <section class="exposure-section">
                    <section class="exposure-title">
                        <article><span>${title}</span></article>
                    </section>
                    <section class="exposure-item-wrapper scroll-img-data">
        `;
        if (data.length === 0) {
            setHTML += `검색된 데이터가 없습니다.`;
        } else {
            const totalItem = data.length;
            const pagePerItem = 21;
            const totalPage = Math.ceil(totalItem/pagePerItem);
            const blockPerPage = 10;
            const totalBlock = Math.ceil(totalPage/blockPerPage);
            
            for (let i = nowPage*pagePerItem ; i < (nowPage+1)*pagePerItem ; i++) {
                if (i >= totalItem) break;
                let imgPre = data[i].nameEng.toLowerCase();
                let imgName = `${imgPre}_${data[i].code}`;
                let itemName = data[i].item_name_reg;
                itemName = itemName.length > 25 ? itemName.substring(0, 25) + '...' : itemName;
                setHTML += `
                    <section class="item-wrapper item-wrapper-scroll">
                        <section class="item-img" data-itemdata='${JSON.stringify(data[i])}'>
                            <img src="https://www.wmullyu.co.kr/images/1000/${imgName}.jpg">
                        </section>
                        <section class="item-name">
                            ${itemName}
                        </section>
                        <section class="item-price">
                            <span style="text-decoration:line-through;">${getCurrentMony(data[i].item_retailPrice)}</span> -> <b style="color:#dc3545;">${getCurrentMony(data[i].item_purchasePrice)}</b>
                        </section>
                    </section>
                `;
            }
            
            pagination(title, totalPage, blockPerPage, nowPage, nowBlock, totalBlock);
        }
        setHTML += `</section></section></section>`;
        newContent.classList.add('scroll-img-data-reset');
        newContent.innerHTML = setHTML;
        mainSection.appendChild(newContent);
        loadingMessage.style.display = 'none'; // 데이터 로딩 완료 후 로딩 메시지 숨기기
        
        const itemBtns = mainSection.querySelectorAll('.item-img');
        itemBtns.forEach((btns) => {
            btns.addEventListener('click', (btn) => {
                const data = JSON.parse(btn.currentTarget.dataset.itemdata);
                printData(data); // printData 함수는 여기서 정의하지 않았으므로 추가 필요
            });
        });
    } catch (error) {
        console.error('Error setting items:', error);
        loadingMessage.style.display = 'none'; // 에러 발생시 로딩 메시지 숨기기
    }
}


const pagination = (title, totalPage, blockPerPage, nowPage, nowBlock, totalBlock) => {
	const myPaginationWrapper = document.querySelector('.my-pagination');
	let html = ``;
	//block
	if(nowBlock === 0){
		html += `<span><i class="fa-solid fa-caret-left"></i><i class="fa-solid fa-caret-left"></i></span>`;
	}else{
		html += `<span onclick="showPage('${title}', '${(nowBlock-1)*blockPerPage}', '${nowBlock-1}')"><i class="fa-solid fa-caret-left"></i><i class="fa-solid fa-caret-left"></i></span>`;
	}
	//page
	if(nowPage === 0){
		html += `<span><i class="fa-solid fa-caret-left"></i></span>`;
	}else{
		if(nowPage%blockPerPage === 0){
			html += `<span onclick="showPage('${title}', '${(nowBlock-1)*blockPerPage}', '${nowBlock-1}')"><i class="fa-solid fa-caret-left"></i></span>`;
		}else{
			html += `<span onclick="showPage('${title}', '${nowPage-1}', '${nowBlock}')"><i class="fa-solid fa-caret-left"></i></span>`;
		}
	}
	for(let i = nowBlock*blockPerPage ; i < (nowBlock+1)*blockPerPage ; i++){
		if(i === totalPage)break;
		if(i === nowPage){
			html += `<span class="pagination-now-page">${i+1}</span>`;
		}else{
			html += `<span onclick="showPage('${title}', '${i}', '${nowBlock}')">${i+1}</span>`;
		}
	}
	//page
	if(nowPage+1 === totalPage){
		html += `<span><i class="fa-solid fa-caret-right"></i></span>`;
	}else{
		if((nowPage+1)%blockPerPage === 0){
			html += `<span onclick="showPage('${title}', '${(nowBlock+1)*blockPerPage}', '${nowBlock+1}')"><i class="fa-solid fa-caret-right"></i></span>`;
		}else{
			html += `<span onclick="showPage('${title}', '${nowPage+1}', '${nowBlock}')"><i class="fa-solid fa-caret-right"></i></span>`;
		}
	}
	//block
	if(totalBlock === nowBlock+1){
		html += `<span><i class="fa-solid fa-caret-right"></i><i class="fa-solid fa-caret-right"></i></span>`;
	}else{
		html += `<span onclick="showPage('${title}', '${(nowBlock+1)*blockPerPage}', '${nowBlock+1}')"><i class="fa-solid fa-caret-right"></i><i class="fa-solid fa-caret-right"></i></span>`;
	}
	myPaginationWrapper.innerHTML = html;
}

const showPage = (title, nowPage, nowBlock) => {
	const scrollSection = document.querySelector('.scroll-img-data-reset');
	if(scrollSection){
		scrollSection.parentNode.removeChild(scrollSection);
	}
	fetchData(title, parseInt(nowPage), parseInt(nowBlock));
}

const downloadExcel = (downloadMode) => {
	if(downloadMode === 'all'){
		location.href = `/item/downloadExcel?mode=all&code=all&orderBy=${orderBy}&inOrder=${inOrder}`;
	}else{
		if(!itemMode || !modeCode){
			alert('현재 페이지에서는 전체 데이터만 다운로드 가능합니다.');
		}else{
			location.href = `/item/downloadExcel?mode=${itemMode}&code=${modeCode}&orderBy=${orderBy}&inOrder=${inOrder}`;
		}
	}
}
