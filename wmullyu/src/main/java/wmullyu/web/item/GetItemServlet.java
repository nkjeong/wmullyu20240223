package wmullyu.web.item;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import javax.sql.DataSource;

import wmullyu.web.category.GetCategoryRandomCode;
import wmullyu.web.dbConnection.ConnectionDB;

public class GetItemServlet {
	public Vector<ItemBean> getItemList(String mode){
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String sql = "";
		if(mode.equals("all")) {
			
		}else if(mode.equals("newReg")) {//메인페이지 최근등록 상품 노출
			sql = "SELECT g.*, m.nameEng, m.nameKor \r\n"
					+ "FROM goods AS g \r\n"
					+ "LEFT JOIN manufacturingcompany AS m ON g.manufacturingCompany_code = m.code \r\n"
					+ "ORDER BY g.`registrationDate` DESC \r\n"
					+ "LIMIT 7;";
		}else if(mode.equals("newReg_more")) {//메인페이지 최근등록 more 상품 노출
			sql="SELECT g.*, m.`nameEng`, m.`nameKor` FROM `goods` AS g LEFT JOIN `manufacturingcompany` AS m ON g.`manufacturingCompany_code`=m.`code` ORDER BY g.`registrationDate` DESC";
		}else if(mode.equals("category")) {//메인페이지 카테고리 상품 노출
			GetCategoryRandomCode gcrc = new GetCategoryRandomCode();
			String code = gcrc.getCategory();
			sql = "SELECT g.*, m.`nameEng`, m.`nameKor` \r\n"
					+ "FROM `goods` AS g \r\n"
					+ "LEFT JOIN `manufacturingcompany` AS m ON g.`manufacturingCompany_code`=m.`code` \r\n"
					+ "WHERE g.`category` LIKE '"+code+"%'\r\n"
					+ "ORDER BY g.`registrationDate` \r\n"
					+ "LIMIT 7;";
		}
		Vector<ItemBean> list = new Vector<ItemBean>();
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()){
				ItemBean ib = new ItemBean();
				ib.setCode(rs.getString("code"));
				ib.setBarcode(rs.getString("barcode"));
				ib.setItem_name(rs.getString("item_name"));
				ib.setItem_name_reg(rs.getString("item_name_reg"));
				ib.setItem_number(rs.getString("item_number"));
				ib.setItem_standard(rs.getString("item_standard"));
				ib.setItem_origin(rs.getString("item_origin"));
				ib.setManufacturingCompany_code(rs.getString("manufacturingCompany_code"));
				ib.setItem_unit(rs.getString("item_unit"));
				ib.setItem_retailPrice(rs.getInt("item_retailPrice"));
				ib.setItem_purchasePrice(rs.getInt("item_purchasePrice"));
				ib.setItem_SalePrice_1(rs.getInt("item_SalePrice_1"));
				ib.setItem_SalePrice_2(rs.getInt("item_SalePrice_2"));
				ib.setItem_SalePrice_3(rs.getInt("item_SalePrice_3"));
				ib.setNotice(rs.getString("notice"));
				ib.setKeyword(rs.getString("keyword"));
				ib.setCategory(rs.getString("category"));
				ib.setRegistrationDate(rs.getString("registrationDate"));
				ib.setModifyDate(rs.getString("modifyDate"));
				ib.setDiscontinued(rs.getString("discontinued"));
				ib.setOutOfStock(rs.getString("outOfStock"));
				ib.setOption(rs.getString("option"));
				ib.setHit(rs.getInt("hit"));
				ib.setNameEng(rs.getString("nameEng"));
				ib.setNameKor(rs.getString("nameKor"));
				ib.setMullyuCode(rs.getString("mullyuCode"));
				ib.setPromotionRate(rs.getString("promotionRate"));
				ib.setPromotionStart(rs.getString("promotionStart"));
				ib.setPromotionEnd(rs.getString("promotionEnd"));
				ib.setPromotion(rs.getString("promotion"));
				list.add(ib);
			}
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		return list;
	}
}
