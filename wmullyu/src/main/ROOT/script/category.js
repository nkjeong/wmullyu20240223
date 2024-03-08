"use strict";
const category = document.querySelector('.category-first');
if (category) {
    async function setCategory(categoryEle) {
        let data;
        try {
            let setHTML = '';
            data = await getFetch(`/category/categoryFirst`);
            setHTML += `<li class="brand">[브랜드]</li>`;
            data.forEach((d) => {
                setHTML += `
                    <li class="category-first-list" data-code="${d.code}" data-name="${d.name}">
                        <span>${d.name}</span>
                        <section class="subCategorySecond"></section>
                    </li>
                `;
            });
            categoryEle.innerHTML = setHTML;
            brand(categoryEle.querySelector('.brand'));//brand.js file
            const categoryFirstList = categoryEle.querySelectorAll('li.category-first-list');
			setSubCategory(categoryFirstList);
			
			//1차 카테고리 클릭
			const category1Btns = categoryEle.querySelectorAll('li.category-first-list > span');
			category1Btns.forEach((btns)=>{
				btns.addEventListener('click',(btn)=>{
					itemMode = 'firstCategory';
					modeCode = btn.currentTarget.parentNode.dataset.code;
					const title = btn.currentTarget.parentNode.dataset.name;
					const scrollSection = document.querySelector('.scroll-img-data-reset');
					if(scrollSection){
						scrollSection.parentNode.removeChild(scrollSection);
					}
					fetchData(title)//imgScrollData.js
				});
			});
        } catch (error) {
            console.error('Error setting category:', error);
        }
    }
    setCategory(category);
    
    //sub category
	async function setSubCategory(categoryFirst){
		let data;
		const categoryLength = categoryFirst.length;
		for(let i = 0 ; i < categoryLength ; i++){
			let dataCode = categoryFirst[i].dataset.code;
			const subCategorySecond = categoryFirst[i].querySelector('.subCategorySecond');
			data = await getFetch(`/category/getCategorySecond?code=${dataCode}`);
			let setHTML = '';
			for(let j = 0 ; j < data.length ; j++){
				setHTML += `
					<section class="category-second-list" data-code="${data[j].code}" data-name="${data[j].name}">
						<!--<section class="subCategoryThird"></section>-->
						<span class="secondCategoryBtn">${data[j].name}</span>
					</section>
				`;
			}
			subCategorySecond.innerHTML = setHTML;
			const subCategorySecondBtns = subCategorySecond.querySelectorAll('.subCategorySecond > section.category-second-list > span');
			subCategorySecondBtns.forEach((btns)=>{
				btns.addEventListener('click', (btn)=>{
					btn.stopPropagation();
					itemMode = 'secondCategory';
					modeCode = btn.currentTarget.closest('.category-first-list').dataset.code+btn.currentTarget.parentNode.dataset.code;
					const firstCategoryName = btn.currentTarget.closest('.category-first-list').dataset.name;
					const secondCategoryName = btn.currentTarget.parentNode.dataset.name;
					const title = firstCategoryName + ' > ' + secondCategoryName;
					const scrollSection = document.querySelector('.scroll-img-data-reset');
					if(scrollSection){
						scrollSection.parentNode.removeChild(scrollSection);
					}
					fetchData(title)//imgScrollData.js
				}, false);
			});
		}
	}
}