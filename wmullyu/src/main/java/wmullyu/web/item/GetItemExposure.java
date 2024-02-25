package wmullyu.web.item;

import java.io.IOException;
import java.util.Vector;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/item/itemExposureList")
public class GetItemExposure extends HttpServlet {

	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String mode = request.getParameter("mode");
		String code = request.getParameter("code");
		GetItemServlet gis = new GetItemServlet();
		Vector<ItemBean> getList = gis.getItemList(mode, code);
		ServletContext application =  request.getServletContext();
		application.setAttribute("getList", getList);
		RequestDispatcher dispatcher = request.getRequestDispatcher("/item/itemExposureList.jsp");
		dispatcher.forward(request, response);
	}
}