package wmullyu.web.brand;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import javax.sql.DataSource;
import wmullyu.web.dbConnection.ConnectionDB;

public class GetBrand {
	public Vector<BrandBean> getBrandList(){
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM `manufacturingcompany` ORDER BY `nameKor`";
		Vector <BrandBean> getBrandAllList = new Vector<BrandBean>();
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			while(rs.next()){
				BrandBean bb = new BrandBean();
				bb.setCode(rs.getString("code"));
				bb.setNameEng(rs.getString("nameEng"));
				bb.setNameKor(rs.getString("nameKor"));
				getBrandAllList.add(bb);
			}
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		return getBrandAllList;
	}
}
