package wmullyu.web.calendar;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/calendar/getCalendar")
public class GetCalendarServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Calendar getDate = Calendar.getInstance();

		int year = getDate.get(Calendar.YEAR);
		int month = getDate.get(Calendar.MONTH) + 1;
		int date = getDate.get(Calendar.DATE);
		int day = getDate.get(Calendar.DAY_OF_WEEK);

		String toDay = "";
		switch (day) {
		case 1:
			toDay = "SUNDAY";
			break;
		case 2:
			toDay = "MONDAY";
			break;
		case 3:
			toDay = "TUESDAY";
			break;
		case 4:
			toDay = "WEDNESDAY";
			break;
		case 5:
			toDay = "THURSDAY";
			break;
		case 6:
			toDay = "FRIDAY";
			break;
		case 7:
			toDay = "SATURDAY";
			break;
		}

		String reMonth = String.format("%02d", month);
		String reDate = String.format("%02d", date);
		
		Map<String, Object> calendarInfo = new HashMap<>();
		calendarInfo.put("year", year);
		calendarInfo.put("month", reMonth);
		calendarInfo.put("date", reDate);
		calendarInfo.put("day", day);
		calendarInfo.put("toDay", toDay);

		ObjectMapper objectMapper = new ObjectMapper();
		String jsonString = objectMapper.writeValueAsString(calendarInfo);

		response.setContentType("application/json;charset=UTF-8");
		response.getWriter().write(jsonString);
	}
}