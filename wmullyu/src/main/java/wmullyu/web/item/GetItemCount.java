package wmullyu.web.item;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/item/cnt")
public class GetItemCount extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String mode = request.getParameter("mode");
		ItemCount ic = new ItemCount();
		int count = ic.getCount(mode);
		ServletContext application =  request.getServletContext();
		application.setAttribute("count", count);
		RequestDispatcher dispatcher = request.getRequestDispatcher("/item/itemCount.jsp");
		dispatcher.forward(request, response);
	}
}