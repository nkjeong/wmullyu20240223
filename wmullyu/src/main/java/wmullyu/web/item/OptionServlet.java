package wmullyu.web.item;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import wmullyu.web.dbConnection.ConnectionDB;

public class OptionServlet {
	public String getOption(String iCode, String mCode){
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String option = "";
		String sql = "SELECT * FROM `option` WHERE `code` = '"+iCode+"' AND `manufacturingcompanyCode` = '"+mCode+"'";
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			if(rs.next()) {
				option = rs.getString("name") + " : " + rs.getString("optionValue");
			}else {
				option = "err : err";
			}
			
		}catch(SQLException e) {
			System.out.println(e);
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		return option;
	}
}
