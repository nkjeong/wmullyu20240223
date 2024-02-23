<%
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",0);
    if (request.getProtocol().equals("HTTP/1.1")){
        response.setHeader("Cache-Control", "no-cache");
    }
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Vector" %>
<%@ page import="wmullyu.web.member.*" %>
<%
	String userId = request.getParameter("userId");
	String userPw = request.getParameter("userPw");
%>
<jsp:useBean id="ckMember" class="wmullyu.web.member.Member" scope="page"/>

<%
	Vector<GetMemberBean> member = ckMember.getMemberInfo(userId, userPw);
	GetMemberBean gmb = (GetMemberBean)member.elementAt(0);
	String condi = gmb.getCondi();
	if(condi.equals("MEMBER")){
		session.setAttribute("idx", gmb.getIdx());
		session.setAttribute("userId", gmb.getUserId());
		session.setAttribute("userPw", gmb.getUserPw());
		session.setAttribute("userMail", gmb.getUserMail());
		session.setAttribute("userCellphone", gmb.getUserCellphone());
		session.setAttribute("companyName", gmb.getCompanyName());
		session.setAttribute("companyRegistrationNumber", gmb.getCompanyRegistrationNumber());
		session.setAttribute("companyPhone", gmb.getCompanyPhone());
		session.setAttribute("companyFAX", gmb.getCompanyFAX());
		session.setAttribute("companyZipcode", gmb.getCompanyZipcode());
		session.setAttribute("companyAddress_1", gmb.getCompanyAddress_1());
		session.setAttribute("companyAddress_2", gmb.getCompanyAddress_2());
		session.setAttribute("registrationDate", gmb.getRegistrationDate());
		session.setAttribute("modifyDate", gmb.getModifyDate());
		session.setAttribute("authority", gmb.getAuthority());
		response.sendRedirect("/index.jsp");
	}else{
		response.sendRedirect("/index.jsp?condi="+condi);
	}
%>