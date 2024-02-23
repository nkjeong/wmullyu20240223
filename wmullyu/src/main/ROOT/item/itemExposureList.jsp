<%
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",0);
    if (request.getProtocol().equals("HTTP/1.1")){
        response.setHeader("Cache-Control", "no-cache");
    }
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

[
<c:forEach var="item" items="${getList}" varStatus="status">
	{
		"code":"${item.code}",
		"barcode":"${item.barcode}",
		"item_name":"${item.item_name}",
		"item_name_reg":"${item.item_name_reg}",
		"item_number":"${item.item_number}",
		"item_standard":"${item.item_standard}",
		"item_origin":"${item.item_origin}",
		"manufacturingCompany_code":"${item.manufacturingCompany_code}",
		"item_unit":"${item.item_unit}",
		"item_retailPrice":"${item.item_retailPrice}",
		"item_purchasePrice":"${item.item_purchasePrice}",
		"item_SalePrice_1":"${item.item_SalePrice_1}",
		"item_SalePrice_2":"${item.item_SalePrice_2}",
		"item_SalePrice_3":"${item.item_SalePrice_3}",
		"notice":"${item.notice}",
		"keyword":"${item.keyword}",
		"category":"${item.category}",
		"registrationDate":"${item.registrationDate}",
		"modifyDate":"${item.modifyDate}",
		"discontinued":"${item.discontinued}",
		"outOfStock":"${item.outOfStock}",
		"option":"${item.option}",
		"hit":"${item.hit}",
		"nameEng":"${item.nameEng}",
		"nameKor":"${item.nameKor}",
		"mullyuCode":"${item.mullyuCode}",
		"promotionRate":"${item.promotionRate}",
		"promotionStart":"${item.promotionStart}",
		"promotionEnd":"${item.promotionEnd}",
		"promotion":"${item.promotion}"
	}
	<c:if test="${!status.last}">
		,
	</c:if>
</c:forEach>
]