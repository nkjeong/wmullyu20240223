"use strict";

function login(form){
	const inputUserId = form.userId;
	const inputUserPw = form.userPw;
	if(inputUserId.value === ''){
		alert('아이디를 입력하세요!');
		inputUserId.focus();
		return false;
	}else{
		if(inputUserPw.value === ''){
			alert('비밀번호를 입력하세요!');
			inputUserPw.focus();
			return false;
		}else{
			return true;
		}
	}
}