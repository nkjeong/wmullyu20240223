package wmullyu.web.member.model;

public class UserPasswordChangeRequest {
	private String userId;
    private String userPw;
    private String newPassword;

    // 기본 생성자
    public UserPasswordChangeRequest() {}

    // Getter와 Setter 메소드
    public String getUserId() {
        return userId;
    }

    public void setUsername(String userId) {
        this.userId = userId;
    }

    public String getUserPw() {
        return userPw;
    }

    public void setUserPw(String userPw) {
        this.userPw = userPw;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
