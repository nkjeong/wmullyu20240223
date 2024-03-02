"use strict";
let itemMode;
let modeCode;
const mainSection = document.querySelector('main');
const brandWrapper = document.querySelector('.brand-wrapper .brand-list-wrapper');
if(brandWrapper){
	async function setBrand(brandEle) {
        let data;
        try {
            let setHTML = '';
            data = await getFetch(`/brand/brandList`);
            const brandLength = data.length;
            const brandSectionSize = 10;
            const brandSection = Math.ceil(brandLength/brandSectionSize);
            const sectionInterval = 100/brandSection;
            for(let i = 0 ; i < brandSection ; i++){
				setHTML += `<section style="width:${sectionInterval}%">`
				for(let j = brandSectionSize*i ; j < (i+1)*brandSectionSize ; j++){
					if(brandLength-1 < j)break;
					setHTML += `<article class="brandSecList" data-code="${data[j].code}">${data[j].nameKor}</article>`;
				}
				setHTML += `</section>`;
            }
            brandEle.innerHTML = setHTML;
            const brandBtn = brandEle.querySelectorAll('.brandSecList');
            brandBtn.forEach((btns)=>{
				btns.addEventListener('click', (btn)=>{
					const brandWrapper = document.querySelector('.brand-wrapper');
					if (brandWrapper) brandWrapper.classList.remove('show');
					itemMode = 'brand';
					modeCode = btn.currentTarget.dataset.code;
					fetchData()//imgScrollData.js
					scrollData()//imgScrollData.js
				});
			});
        } catch (error) {
            console.error('Error setting brand:', error);
        }
    }
    setBrand(brandWrapper);
}

function brand(brand) {//catagory.js 에서 호출
    const brandWrapper = document.querySelector('.brand-wrapper');
    const faXmark = document.querySelector('i.fa-solid.fa-xmark');

    const toggleBrandWrapper = function () {
        brandWrapper.classList.toggle('show');
    };
    const brandClickHandler = function () {
        toggleBrandWrapper();
    };
    const faXmarkClickHandler = function () {
        toggleBrandWrapper();
    };
    if (brand && brandWrapper && faXmark) {
        brand.addEventListener('click', brandClickHandler);
        faXmark.addEventListener('click', faXmarkClickHandler);
    }
    return function cleanup() {
        if (brand && brandWrapper && faXmark) {
            brand.removeEventListener('click', brandClickHandler);
            faXmark.removeEventListener('click', faXmarkClickHandler);
        }
    };
}