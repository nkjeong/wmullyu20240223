package wmullyu.web.category;

import java.util.Random;
import java.util.Vector;

public class GetCategoryRandomCode {
	public String getCategory() {
		GetCategoryFirst gcf = new GetCategoryFirst();
		String code = "";
		Vector<CategoryBean> getCategoryList = gcf.getCategoryList();
		Random random = new Random();
        int randomNumber = random.nextInt(getCategoryList.size());
        CategoryBean cbr = (CategoryBean)getCategoryList.elementAt(randomNumber);
        code = cbr.getCode();
		return code;
	}
}
