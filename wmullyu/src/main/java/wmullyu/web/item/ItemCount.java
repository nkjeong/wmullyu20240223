package wmullyu.web.item;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import wmullyu.web.dbConnection.ConnectionDB;

public class ItemCount {
	public int getCount(String mode) {
		int count = 0;
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String sql = "";
		if(mode.equals("all")) {
			sql = "SELECT COUNT(*) AS `cnt` FROM `goods`";
		}else if(mode.equals("new")) {
			sql = "SELECT COUNT(*) AS `cnt` FROM `goods` WHERE `registrationDate` >= CURDATE() - INTERVAL 7 DAY";
		}else if(mode.equals("discontinued")) {
			sql = "SELECT COUNT(*) AS `cnt` FROM `goods` WHERE `discontinued` = 'Y'";
		}
		else if(mode.equals("extinction ")) {
			sql = "SELECT COUNT(*) AS `cnt` FROM `goods` WHERE `outOfStock` = 'Y'";
		}
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			rs.next();
			count = rs.getInt("cnt");
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		return count;
	}
}
