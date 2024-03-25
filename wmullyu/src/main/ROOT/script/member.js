"use strict";

const changePwd = document.querySelector('.changePwd');
changePwd.addEventListener('click', (btn)=>{
	const getPwdInput = siblings(btn.currentTarget)[0];
	if(getPwdInput.value.trim() === ""){
		alert('비밀번호를 입력하세요');
		getPwdInput.value = '';
		getPwdInput.focus();
	}else{
		const userId = getPwdInput.closest('.memberForm').querySelector('.userId');
		changePassword(getPwdInput.value, userId.value);
	}
});

const siblings = (ele) => [...ele.parentElement.children].filter(e => e != ele);

const changePassword = (getPw, getId) => {
	fetch('/member/changePassword', { // 요청을 보낼 URL
		method: 'POST', // HTTP 요청 메서드 지정
		headers: {
			'Content-Type': 'application/json', // 컨텐츠 타입을 JSON으로 지정
		},
		body: JSON.stringify({ // 서버로 보낼 데이터
			userId: getId,
			userPw: getPw
		})
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json(); // 응답을 JSON으로 변환
	})
	.then(data => {
		console.log(data); // 처리된 데이터를 콘솔에 출력
	})
	.catch(error => {
		console.error('There was a problem with your fetch operation:', error);
	});

};