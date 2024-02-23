package wmullyu.web.member;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Vector;

import wmullyu.web.dbConnection.ConnectionDB;

import javax.sql.DataSource;

public class GetMember {
	public Vector<GetMemberBean> getInfo(String userId, String userPw) {
		Vector <GetMemberBean> info = new Vector<GetMemberBean>();
		Statement stmt = null;
		Connection conn = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM `user` WHERE `userId`='"+userId.trim()+"'";
		try {
			ConnectionDB cdb = new ConnectionDB();
			DataSource getds= cdb.getCon();
			conn = getds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);
			GetMemberBean gmb = new GetMemberBean();
			if(rs.next()) {
				if(rs.getString("userPw").equals(userPw.trim())) {
					gmb.setCondi("MEMBER");
					gmb.setIdx(rs.getString("idx"));
					gmb.setUserId(rs.getString("userId"));
					gmb.setUserPw(rs.getString("userPw"));
					gmb.setUserMail(rs.getString("userMail"));
					gmb.setUserCellphone(rs.getString("userCellphone"));
					gmb.setCompanyName(rs.getString("companyName"));
					gmb.setCompanyRegistrationNumber(rs.getString("companyRegistrationNumber"));
					gmb.setCompanyPhone(rs.getString("companyPhone"));
					gmb.setCompanyFAX(rs.getString("companyFAX"));
					gmb.setCompanyZipcode(rs.getString("companyZipcode"));
					gmb.setCompanyAddress_1(rs.getString("companyAddress_1"));
					gmb.setCompanyAddress_2(rs.getString("companyAddress_2"));
					gmb.setRegistrationDate(rs.getString("registrationDate"));
					gmb.setModifyDate(rs.getString("modifyDate"));
					gmb.setAuthority(rs.getString("authority"));
					info.add(gmb);
				}else {
					gmb.setCondi("WRONG-PASSWORD");
					info.add(gmb);
				}
			}else {
				gmb.setCondi("NO-MEMBER");
				info.add(gmb);
			}
		}catch(SQLException e) {
		}finally {
			if(stmt != null) try{ stmt.close(); }catch(Exception ex){}
			if(conn != null) try{ conn.close(); }catch(Exception ex){}
	        if(rs != null) try{ rs.close(); }catch(Exception ex){}
		}
		return info;
	}
}
