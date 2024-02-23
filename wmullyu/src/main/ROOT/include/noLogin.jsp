<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
	<section>
		<section class="login-title">
			Member Login
		</section>
		<section class="login-notice">
			<article>로그인 하세요~</article>
		</section>
		<section class="login-wrapper">
			<form name="loginForm" class="loginForm" method="post" action="/member/login.jsp" onsubmit="return login(this);">
				<div class="form-floating mb-3">
				  <input type="text" name="userId" class="form-control" id="floatingInput" placeholder="userid">
				  <label for="floatingInput">User ID</label>
				</div>
				<div class="form-floating">
				  <input type="password" name="userPw" class="form-control" id="floatingPassword" placeholder="Password">
				  <label for="floatingPassword">User Password</label>
				</div>
				<div class="submitBtn">
					<button type="submit" name="submit" class="btn btn-light submit">login</button>
				</div>
			</form>
		</section>
<%
	String condi = request.getParameter("condi");
	if(condi != null){
%>
		<section class="login-err">
<%
			if(condi.equals("WRONG-PASSWORD")){
				out.print("비밀번호가 틀립니다. 비밀번호를 확인하세요.");
			}else if(condi.equals("NO-MEMBER")){
				out.print("비회원입니다. 관리자에게 문의 바랍니다.");
			}else{
				out.print("접속오류 입니다. 다시 시도하세요!");
			}
%>
		</section>
<%
	}
%>
		<section class="login-notice">
			<article>(주)세상종합물류 데이터 공유센터는 회원제로 운영되고 있습니다.</article>
			<article>비회원은 관리자에게 문의하여 회원가입 후 이용 바랍니다.</article>
		</section>
	</section>