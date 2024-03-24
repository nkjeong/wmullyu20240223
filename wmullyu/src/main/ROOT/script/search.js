"use strict";

const ckSearch = (form) => {
	const keyword = form.search;
	if(keyword.value === ''){
		alert('검색어를 입력하세요');
		keyword.focus();
		return false;
	}else{
		itemMode = 'search';
		modeCode = keyword.value;
		const title = '검색어 : '+modeCode;
		const scrollSection = document.querySelector('.scroll-img-data-reset');
		if(scrollSection){
			scrollSection.parentNode.removeChild(scrollSection);
		}
		fetchData(title)//imgScrollData.js
		return false;
	}
}

const searchBtn = document.querySelector('.search-form i.fa-magnifying-glass-arrow-right');
if(searchBtn){
	searchBtn.addEventListener('click', ()=>{
		ckSearch(searchBtn.closest('.search-form'));
	});
}

/*const getSearchItems = (keyword) => {
	itemMode = 'search';
	modeCode = keyword;
	const title = '검색어 : '+modeCode;
	const scrollSection = document.querySelector('.scroll-img-data-reset');
	if(scrollSection){
		scrollSection.parentNode.removeChild(scrollSection);
	}
	if(modeCode !== ''){
		fetchData(title)//imgScrollData.js
	}else{
		location.href='/';
	}
}

const searchForm = document.querySelector('.search-form')
if(searchForm){
	const keyword = searchForm.search;
	keyword.focus();
	keyword.addEventListener('keyup', (keyword)=>{
		getSearchItems(keyword.target.value);
	});
}
*/