import("etherpad.log");
import("etherpad.utils.*");
import("plugins.openid.models.openidSession");
function renderAuthentication(){
	return openidSession.isLoggedIn() ? openidSession.getUserName() : renderTemplateAsString('loginForm.ejs', {}, ['openid']);

}
function onRequest(){
	if(request.method == "POST") return create();
	return false;
}

function create(){
	response.write("POSTED TO OPENID with " + request.params.openid_url);
	return true;
}
