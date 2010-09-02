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
	
	response.write("<br><br>gonna redirect to something like " + unescape("https://login.launchpad.net/+openid?openid.assoc_handle=%7BHMAC-SHA1%7D%7B4c7f7e79%7D%7BIie%2FtQ%3D%3D%7D&openid.ax.mode=fetch_request&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.ax=http%3A%2F%2Fopenid.net%2Fsrv%2Fax%2F1.0&openid.ns.sreg=http%3A%2F%2Fopenid.net%2Fextensions%2Fsreg%2F1.1&openid.realm=http%3A%2F%2Flocalhost%3A3000%2F&openid.return_to=http%3A%2F%2Flocalhost%3A3000%2Fsession%3F_method%3Dpost%26open_id_complete%3D1&openid.sreg.required=nickname"));
	
	
	return true;
}
