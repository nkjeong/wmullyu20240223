package wmullyu.web.brand;

import java.io.IOException;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/brand/brandList")
public class Brand extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Vector <BrandBean> getBrandList = new Vector<BrandBean>();
		
		GetBrand brandList = new GetBrand();
		getBrandList = brandList.getBrandList();
		
		ServletContext application =  request.getServletContext();
		application.setAttribute("getBrandList", getBrandList);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/brand/brandList.jsp");
		dispatcher.forward(request, response);
	}
}
