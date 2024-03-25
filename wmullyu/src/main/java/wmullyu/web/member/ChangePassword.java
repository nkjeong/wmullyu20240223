package wmullyu.web.member;

import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import wmullyu.web.member.model.UserPasswordChangeRequest; // 가정한 모델 클래스 경로

@WebServlet("/member/changePassword")
public class ChangePassword extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // ObjectMapper 인스턴스 생성
        ObjectMapper mapper = new ObjectMapper();
        
        // HttpServletRequest에서 JSON 문자열 읽기 및 Java 객체로 변환
        UserPasswordChangeRequest changeRequest = mapper.readValue(request.getReader(), UserPasswordChangeRequest.class);
        
        // 데이터 처리 예시
        String userId = changeRequest.getUserId();
        String userPw = changeRequest.getUserPw();
        String newPassword = changeRequest.getNewPassword();
        
        // 비밀번호 변경 로직 구현...
        
        ChangePasswordServlet cps = new ChangePasswordServlet();
        String msg = cps.ckPassword(userId, userPw, newPassword);
        
        // 응답 JSON 구성 및 전송
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        mapper.writeValue(response.getWriter(), new SimpleResponse(msg));
    }

    // 간단한 응답 객체 예제
    public static class SimpleResponse {
        private String message;

        public SimpleResponse(String message) {
            this.message = message;
        }

        // Getter 및 Setter
        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
