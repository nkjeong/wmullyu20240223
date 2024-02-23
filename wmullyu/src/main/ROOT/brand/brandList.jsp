<%
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",0);
    if (request.getProtocol().equals("HTTP/1.1")){
        response.setHeader("Cache-Control", "no-cache");
    }
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
[
<c:forEach var="brand" items="${getBrandList}" varStatus="status">
	{
		"code":"${brand.code}",
		"nameEng":"${brand.nameEng}",
		"nameKor":"${brand.nameKor}"
	}
	<c:if test="${!status.last}">
		,
	</c:if>
</c:forEach>
]