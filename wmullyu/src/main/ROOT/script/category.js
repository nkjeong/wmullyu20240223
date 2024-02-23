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
                    <li class="category-first-list" data-code="${d.code}">
                        ${d.name}
                        <section class="subCategorySecond"></section>
                    </li>
                `;
            });
            categoryEle.innerHTML = setHTML;
            brand(categoryEle);//brand.js file
            const categoryFirstList = categoryEle.querySelectorAll('li.category-first-list');
			setSubCategory(categoryFirstList);
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
					<section data-code="${data[j].code}">
						<section class="subCategoryThird"></section>
						${data[j].name}
					</section>
				`;
			}
			subCategorySecond.innerHTML = setHTML;
	/*		const subCategorySecondBtns = subCategorySecond.querySelectorAll('.subCategorySecond > section');
			subCategorySecondBtns.forEach((btns)=>{
				btns.addEventListener('click', (btn)=>{
					btn.stopPropagation();
					let cateFirst = btn.currentTarget.parentNode.parentNode.dataset.code;
					let cateSecond = btn.currentTarget.dataset.code;
					let keyword = cateFirst+cateSecond;
					setItemList ('subCategorySecond', craeteBackBoardComm, keyword);
				}, false);
			});*/
		}
	}
}