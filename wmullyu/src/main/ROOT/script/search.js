"use strict";

const ckSearch = (form) => {
	const keyword = form.search;
	if(keyword.value === ''){
		alert('검색어를 입력하세요');
		keyword.focus();
		return false;
	}else{
		return false;
	}
}

const searchBtn = document.querySelector('.search-form i.fa-magnifying-glass-arrow-right');
if(searchBtn){
	searchBtn.addEventListener('click', ()=>{
		ckSearch(searchBtn.closest('.search-form'));
	});
}