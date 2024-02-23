<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>

<%@ include file="/include/top.jsp"%>
	<%
		if(userId == null){
	%>
			<%@ include file="/include/noLogin.jsp"%>
	<%
		}else{
	%>
			<%@ include file="/include/logged.jsp"%>
	<%	
		}
	%>
<%@ include file="/include/footer.jsp"%>
