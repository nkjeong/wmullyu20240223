package wmullyu.web.dbConnection;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class ConnectionDB {
	public DataSource getCon() {
		InitialContext ctx = null;
		DataSource ds = null;
		try {
			ctx = new InitialContext();
			ds = (DataSource) ctx.lookup("java:comp/env/mariadb");
		}catch(NamingException e) {
			
		}
		return ds;
	}
}