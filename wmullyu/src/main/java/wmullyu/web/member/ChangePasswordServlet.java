package wmullyu.web.member;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.sql.DataSource;

import wmullyu.web.dbConnection.ConnectionDB;

public class ChangePasswordServlet {
    public String ckPassword(String userId, String userPw, String newPassword) {
        String msg = "";
        String selectSql = "SELECT userPw FROM `user` WHERE `userId` = ?";
        String updateSql = "UPDATE `user` SET `userPw` = ? WHERE `userId` = ?";
        ConnectionDB cdb = null;
        DataSource getds = null;
        Connection conn = null;
        PreparedStatement selectStmt = null;
        ResultSet rs = null;
        try {
            cdb = new ConnectionDB();
            getds = cdb.getCon();
            conn = getds.getConnection();
            selectStmt = conn.prepareStatement(selectSql);
            selectStmt.setString(1, userId.trim());
            
            rs = selectStmt.executeQuery();
            if (rs.next()) {
                if (rs.getString("userPw").equals(userPw.trim())) {
                    try (PreparedStatement updateStmt = conn.prepareStatement(updateSql)) {
                        updateStmt.setString(1, newPassword);
                        updateStmt.setString(2, userId);
                        updateStmt.executeUpdate();
                        msg = "SUCCESSFULLY";
                    }
                } else {
                    msg = "WRONG-PASSWORD";
                }
            } else {
                msg = "NO-MEMBER";
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Consider logging this exception or handling it as appropriate
            msg = "ERROR"; // Optionally, provide a more specific message based on the exception
        } finally {
            try {
                if (rs != null) rs.close();
                if (selectStmt != null) selectStmt.close();
                if (conn != null) conn.close();
                // Assuming ConnectionDB needs to be closed if it implements a close method not shown here
                // if (cdb != null) cdb.close();
            } catch (SQLException e) {
                e.printStackTrace(); // Consider logging this exception
            }
        }
        return msg;
    }
}
