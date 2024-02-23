<%
    response.setHeader("Cache-Control","no-store");
    response.setHeader("Pragma","no-cache");
    response.setDateHeader("Expires",0);
    if (request.getProtocol().equals("HTTP/1.1")){
        response.setHeader("Cache-Control", "no-cache");
    }
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>

<%
	String userId = (String)session.getAttribute("userId");
	String companyName = (String)session.getAttribute("companyName");
	String authority = (String)session.getAttribute("authority");
%>

<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="UTF-8">
		<title>(주)세상종합물류 데이터 공유센터</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
		<link rel="stylesheet" href="/style/main.css">
		<link rel="stylesheet" href="/style/mainLogged.css">
		<script>
			async function getFetch(url) {
			    try {
			        const response = await fetch(url);
			        return await response.json();
			    } catch (error) {
			        console.error('Error fetching data:', error);
			        throw error; // 예외를 상위로 다시 던져 처리할 수 있도록 함
			    }
			}
		</script>
	</head>
	<body>
		<!-- 		
			<div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
			  <div class="offcanvas-header">
			    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
			    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			  </div>
			  <div class="offcanvas-body">
			    <p>Try scrolling the rest of the page to see this option in action.</p>
			  </div>
			</div>
		-->
		<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
		  <div class="offcanvas-header">
		    <h5 id="offcanvasWithBothOptionsLabel"></h5>
		    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		  </div>
		  <div class="offcanvas-body">
		    <section class="thumbnail-view-section">
		    	<section class="thumbnail-view"></section>
		    	<section class="item-data-view">
		    		<section>
		    			<section>바코드</section>
		    			<section>•</section>
		    			<section class="barcode"></section>
		    		</section>
		    		<section>
		    			<section>소비자가</section>
		    			<section>•</section>
		    			<section class="item-retailPrice"></section>
		    		</section>
		    		<section>
		    			<section>공급가</section>
		    			<section>•</section>
		    			<section class="item-purchasePrice"></section>
		    		</section>
		    		<section>
		    			<section>품번</section>
		    			<section>•</section>
		    			<section class="item-number"></section>
		    		</section>
		    		<section>
		    			<section>규격</section>
		    			<section>•</section>
		    			<section class="item-standard"></section>
		    		</section>
		    		<section>
		    			<section>옵션</section>
		    			<section>•</section>
		    			<section class="option"></section>
		    		</section>
		    		<section>
		    			<section>키워드</section>
		    			<section>•</section>
		    			<section class="keyword"></section>
		    		</section>
		    		<section>
		    			<section>브랜드</section>
		    			<section>•</section>
		    			<section class="name-kor"></section>
		    		</section>
		    		<section>
		    			<section>원산지</section>
		    			<section>•</section>
		    			<section class="item-origin"></section>
		    		</section>
		    	</section>
		    </section>
		    <section class="set-img-html">
		    	<section>
		    		<section>썸네일</section>
		    		<section class="html"></section>
		    	</section>
		    	<section>
		    		<section>상세</section>
		    		<section class="html"></section>
		    	</section>
		    </section>
		    <section class="detail-view-section">
		    	<section class="detail-view-title">Detail View</section>
		    	<section class="detail-view-img"></section>
		    </section>
		  </div>
		</div>
		<header>
			<section class="h-top">
				<section class="h-top-left">
					<article><a class="h-top-a" href="/">HOME</a></article>
					<article>•</article>
					<article><a class="h-top-a" href="https://www.jiumoffice.co.kr" target="_blank">jiumoffice mall</a></article>
					<article>•</article>
					<article>
					<%
						if(userId == null){
					%>
							로그인 하세요~
					<%
						}else{
					%>
							<form class="search-form" name="search-form" onsubmit="return ckSearch(this);">
								<article>검색</article>
								<article><input type="text" name="search" class="search"></article>
								<article><i class="fa-solid fa-magnifying-glass-arrow-right"></i></article>
							</form>
					<%	
						}
					%>

					</article>
				</section>
				<section class="h-top-right">
					<%
						if(userId == null){
					%>
							<article><a class="h-top-a" href="/">JOIN</a></article>
					<%
						}else{
					%>
							<article>[<%=companyName%>] <%=userId%>님 환영합니다~</article>
							<article>•</article>
							<article>MEMBER</article>
							<article>•</article>
							<article><a class="h-top-a" href="/member/logout.jsp">LOGOUT</a></article>
					<%	
						}
					%>
				</section>
			</section>
			<section class="h-center">
				<article>
					<a href="/">
						<img src="/images/source/top_logo.png">
					</a>
				</article>
			</section>
			<section class="h-bottom">
				<%
					if(userId == null){
				%>
						로그인 하세요~
				<%
					}else{
				%>
						<nav class="category">
							<ul class="category-first">
								<!-- category-first -->
							</ul>
							<section class="brand-wrapper">
								<section>
									<article></article>
									<article>BRAND</article>
									<article><i class="fa-solid fa-xmark"></i></article>
								</section>
								<section class="brand-list-wrapper">
									<!-- brand list -->
								</section>
							</section>
						</nav>
				<%	
					}
				%>
			</section>
			<section class="h-item-info">
					<%
						if(userId == null){
					%>
							로그인 하세요~
					<%
						}else{
					%>
							<section class="h-item-wrapper">
								<section class="h-item-article">
									<article title="전체상품">All : <span class="item-all" data-query="all"></span>개</article>
									<article title="최근등록상품">New : <span class="item-new" data-query="new"></span>개</article>
									<article title="품절상품">Sold out : <span class="item-soldout" data-query="outOfStock"></span>개</article>
									<article title="단종상품">Extinction : <span class="item-extinction" data-query="discontinued"></span>개</article>
								</section>
								<section class="h-time-article">
									<article class="calendar">2024-02-09 수요일</article>
								</section>
							</section>
					<%	
						}
					%>
			</section>
		</header>
		<main>