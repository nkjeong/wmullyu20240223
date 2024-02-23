package wmullyu.web.category;

import java.io.IOException;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/category/getCategorySecond")
public class CategorySecond extends HttpServlet {

	private static final long serialVersionUID = 1L;
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String code = request.getParameter("code");
		Vector <CategoryBean> categorySecondList = new Vector<CategoryBean>();
		
		GetCategorySecond secondList = new GetCategorySecond();
		categorySecondList = secondList.getCategoryList(code);
		
		ServletContext application =  request.getServletContext();
		application.setAttribute("getCategoryList", categorySecondList);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/category/category.jsp");
		dispatcher.forward(request, response);
	}
}