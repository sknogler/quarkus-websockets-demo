package at.htl.websockets;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.HashSet;
import java.util.Set;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("user")
public class UserResource {

    private static final Set<String> users = new HashSet<>();

    @POST
    public Response registerUser(LoginRequest request) throws InterruptedException {
        var userName = request.userName;
        Thread.sleep(1500);
        if (users.contains(userName)){
            return Response.ok(new LoginResult(userName, false)).build();
        }
        users.add(userName);
        return Response.ok(new LoginResult(userName, true)).build();
    }

    record LoginResult(String user, boolean success){}
    record LoginRequest(String userName){}
}