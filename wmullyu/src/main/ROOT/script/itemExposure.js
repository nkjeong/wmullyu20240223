"use strict";

const itemExposure = document.querySelectorAll('.item-exposure > .exposure-section');
if (itemExposure.length != 0) {
    async function setExposure(mode, idx) {
        const ele = itemExposure[idx].querySelector('.exposure-item-wrapper');
        let data;
        try {
            let setHTML = '';
            data = await getFetch(`/item/itemExposureList?mode=${mode}`);
            data.forEach((d) => {
                let imgPre = d.nameEng.toLowerCase();
                let imgName = `${imgPre}_${d.code}`;
                let itemName = d.item_name_reg;
                itemName = itemName.length > 25 ? itemName.substring(0, 25) + '...' : itemName;
                setHTML += `
                    <section class="item-wrapper">
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
            ele.innerHTML = setHTML;
            const itemBtns = ele.querySelectorAll('.item-img');
            itemBtns.forEach((btns)=>{
				btns.addEventListener('click',(btn)=>{
					const data = JSON.parse(btn.currentTarget.dataset.itemdata);
					printData(data);
				});
			});
        } catch (error) {
            console.error('Error setting exposure:', error);
        }
    }

    async function runSetExposure() {
        await setExposure('newReg', 0); // Wait for the first call to complete
        await setExposure('category', 1); // Then proceed with the second call
    }

    runSetExposure();
}

const printData = (data) =>{
	const imgPre = data.nameEng.toLowerCase();
	const imgName = `${imgPre}_${data.code}`;
	const offcanvasElement = document.getElementById('offcanvasWithBothOptions');
	const offcanvasWithBothOptionsLabel = offcanvasElement.querySelector('#offcanvasWithBothOptionsLabel');
	offcanvasWithBothOptionsLabel.innerHTML = `${data.item_name}`;
	const thumbnailView = offcanvasElement.querySelector('.thumbnail-view');
	thumbnailView.innerHTML = `<img src="https://www.wmullyu.co.kr/images/1000/${imgName}.jpg">`;
	const barcode = offcanvasElement.querySelector('.item-data-view .barcode');
	barcode.innerHTML = `${data.barcode}`;
	const itemRetailPrice = offcanvasElement.querySelector('.item-data-view .item-retailPrice');
	itemRetailPrice.innerHTML = `${getCurrentMony(data.item_retailPrice)}`;
	const itemPurchasePrice = offcanvasElement.querySelector('.item-data-view .item-purchasePrice');
	itemPurchasePrice.innerHTML = `${getCurrentMony(data.item_purchasePrice)}`;
	const itemNumber = offcanvasElement.querySelector('.item-data-view .item-number');
	itemNumber.innerHTML = `${data.item_number}`;
	const itemStandard = offcanvasElement.querySelector('.item-data-view .item-standard');
	itemStandard.innerHTML = `${data.item_standard}`;
	const option = offcanvasElement.querySelector('.item-data-view .option');
	if(data.option === 'N'){
		option.innerHTML = `없음`;
	}else{
		getOption(option, data.code, data.manufacturingCompany_code);
	}
	const keyword = offcanvasElement.querySelector('.item-data-view .keyword');
	keyword.innerHTML = `${data.keyword}`;
	const nameKor = offcanvasElement.querySelector('.item-data-view .name-kor');
	nameKor.innerHTML = `${data.nameKor}(${data.nameEng})`;
	const itemOrigin = offcanvasElement.querySelector('.item-data-view .item-origin');
	itemOrigin.innerHTML = `${data.item_origin}`;
	const thumbnailImg = offcanvasElement.querySelector('.set-img-html section:first-child .html');
	thumbnailImg.innerText = `https://www.wmullyu.co.kr/images/1000/${imgName}.jpg`;
	const detailImg = offcanvasElement.querySelector('.set-img-html section:last-child .html');
	detailImg.innerText = `<div style="width:100%; text-align:center;">
		<img src="https://www.wmullyu.co.kr/images/detail/${imgName}.jpg">
		</div>`;
	const detailViewImg = offcanvasElement.querySelector('.detail-view-section .detail-view-img');
	detailViewImg.innerHTML = `
		<img src="https://www.wmullyu.co.kr/images/detail/${imgName}.jpg">
	`;
	const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
	bsOffcanvas.show();
}

const getOption = async (ele, code, manufacturingCompany_code) => {
	const data = await getFetch(`/item/getOption?code=${code}&manufacturingCompany_code=${manufacturingCompany_code}`);
	ele.innerHTML = data.option;
}