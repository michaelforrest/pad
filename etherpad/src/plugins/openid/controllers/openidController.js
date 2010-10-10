import("etherpad.log");
import("etherpad.utils.*");
import("etherpad.sessions.getSession");
jimport("org.openid4java.consumer.ConsumerManager");
jimport("org.openid4java.message.ParameterList");
jimport("org.openid4java.message.Parameter");
jimport("org.openid4java.discovery.DiscoveryInformation");
jimport("org.openid4java.message.sreg.SRegRequest");



function renderAuthentication(){
    return renderTemplateAsString('loginForm.ejs', {}, ['openid']);
	//return openidSession.isLoggedIn() ? openidSession.getUserName() : 
}
function onRequest(){
    if(request.params['logout']) return logout();
	if(request.params['open_id_complete']) return completeLogin();
	if(request.method == "POST") return create();
	return false;
}
function create(){
    var session = getSession();
    var manager = new ConsumerManager();
    var discoveries = manager.discover(request.params.openid_url);
    var discovered = manager.associate(discoveries);
    
    // store the discovery information in the user's session for later use
    // leave out for stateless operation / if there is no session
    session.discovered= discovered;
    log.info("HOST:" + request.host);
    var returnUrl = request.scheme + "://" + request.host + "/ep/openid/?open_id_complete=true";
    var authReq = manager.authenticate(discovered, returnUrl);
    
    var sregReq = SRegRequest.createFetchRequest();
    sregReq.addAttribute("fullname", true);
    sregReq.addAttribute("nickname", true);
    sregReq.addAttribute("email", true);
    authReq.addExtension(sregReq);
    
    response.redirect( authReq.getDestinationUrl(true) );
	return true;
}
function completeLogin(){
    var openidResp = new ParameterList();
    for(var e in request.params){
        openidResp.set(new Parameter(e, unescape(request.params[e])));
    }
    log.info("OpenID response ParameterList: " + openidResp);
    var session = getSession();
    discovered = session.discovered;
    var manager = new ConsumerManager();
    var verification = manager.verify(request.scheme + "://" + request.host + request.path + "?" + request.query, openidResp, discovered);
    var verified = verification.getVerifiedId();
    if (verified != null){
        response.write("Logged in successfully");
        response.write("<a href='?logout=true'>log out</a>");
    }else{
        response.write("Failed to log in: " + verification.getStatusMsg());
    }
    for(var e in request.params ) response.write("<p>" + e + "=" + request.params[e] + "</p>")    
	return true;
}

function logout(){
    response.write("logging out");
    var session = getSession();
    session.discovered = null;
    session["openid-claimed"] = null;
    return true;
}
