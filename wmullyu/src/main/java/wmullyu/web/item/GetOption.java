package wmullyu.web.item;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/item/getOption")
public class GetOption extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String code = request.getParameter("code");
		String manufacturingCompany_code = request.getParameter("manufacturingCompany_code");
		OptionServlet os = new OptionServlet();
		String getOption = os.getOption(code, manufacturingCompany_code);
		ServletContext application =  request.getServletContext();
		application.setAttribute("getOption", getOption);
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/item/option.jsp");
		dispatcher.forward(request, response);
	}
}