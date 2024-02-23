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

@WebServlet("/category/categoryFirst")
public class CategoryFirst extends HttpServlet {

	private static final long serialVersionUID = 1L;
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Vector <CategoryBean> categoryFirstList = new Vector<CategoryBean>();
		
		GetCategoryFirst firstList = new GetCategoryFirst();
		categoryFirstList = firstList.getCategoryList();
		
		ServletContext application =  request.getServletContext();
		application.setAttribute("getCategoryList", categoryFirstList);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/category/category.jsp");
		dispatcher.forward(request, response);
	}
}