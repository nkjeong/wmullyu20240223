package wmullyu.web.member;

import java.util.Vector;

public class Member {
	public Vector<GetMemberBean> getMemberInfo(String userId, String userPw) {
		GetMember member = new GetMember();
		Vector <GetMemberBean> getInfo = member.getInfo(userId, userPw);
		return getInfo;
	}
}
