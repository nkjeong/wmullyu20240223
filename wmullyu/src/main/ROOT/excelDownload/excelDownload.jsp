<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	response.setHeader("Content-Type", "application/vnd.ms-xls");
	response.setHeader("Content-Disposition", "attachment; filename=itemlist.xls"); 
	response.setHeader("Content-Description", "JSP Generated Data");
	response.setHeader("Pragma", "public");
	response.setHeader("Cache-Control", "max-age=0");
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Excel list</title>
		<style>
			table, tr, td{
				border-collapse: collapse;
				border: thin solid gray;
			}
			tr.lineFirst{
				background-color: #dce6f1;
				text-align: center;
				font-weight: bold;
			}
			td.firstEle{
				text-align: center;
			}
			td.price{
				background-color: #fce4d6;
				font-weight: bold;
			}
			td.file{
				background-color: #e2efda;
			}
		</style>
	</head>
	<body>
		<table class="excel">
			<tr class="lineFirst">
				<td>No.</td>
				<td>상품코드</td>
				<td>바코드</td>
				<td>상품명</td>
				<td>등록상품명</td>
				<td>품번</td>
				<td>규격</td>
				<td>제조국</td>
				<td>단위</td>
				<td class="price">소비자가</td>
				<td class="price">공급가</td>
				<td class="file">대표이미지</td>
				<td class="file">상세이미지</td>
				<td>기타사항</td>
				<td>키워드</td>
				<td>카테고리</td>
				<td>등록일</td>
				<td>수정일</td>
				<td>품절여부</td>
				<td>단종여부</td>
				<td>옵션여부</td>
				<td>옵션명</td>
				<td>옵션값</td>
				<td>제조사</td>
			</tr>
			<c:forEach var="downloadXls" items="${getList}" varStatus="status">
				<tr class="contents">
					<td class="firstEle">${status.index+1}</td>
					<td style="mso-number-format:'\@'">${downloadXls.code}</td>
					<td style="mso-number-format:'\@'">${downloadXls.barcode}</td>
					<td>${downloadXls.item_name}</td>
					<td>${downloadXls.item_name_reg}</td>
					<td>${downloadXls.item_number}</td>
					<td>${downloadXls.item_standard}</td>
					<td>${downloadXls.item_origin}</td>
					<td>${downloadXls.item_unit}</td>
					<td class="price"><fmt:formatNumber value="${downloadXls.item_retailPrice}" type="number"/></td>
					<td class="price"><fmt:formatNumber value="${downloadXls.item_purchasePrice}" type="number"/></td>
					<td class="file">https://www.wmullyu.co.kr/images/1000/${fn:toLowerCase(downloadXls.nameEng)}_${downloadXls.code}.jpg</td>
					<td class="file">&lt;div style="width:100%; text-align:center;"&gt;&lt;img src="https://www.wmullyu.co.kr/images/detail/${fn:toLowerCase(downloadXls.nameEng)}_${downloadXls.code}.jpg"&gt;&lt;/div&gt;</td>
					<td>${downloadXls.notice}</td>
					<td>${downloadXls.keyword}</td>
					<td>${downloadXls.category}</td>
					<td>${downloadXls.registrationDate}</td>
					<td>${downloadXls.modifyDate}</td>
					<td>${downloadXls.discontinued}</td>
					<td>${downloadXls.outOfStock}</td>
					<td>${downloadXls.option}</td>
					<td>${downloadXls.optionName}</td>
					<td>${downloadXls.optionValue}</td>
					<td>${downloadXls.nameKor}</td>
				</tr>
			</c:forEach>
		</table>
	</body>
</html>