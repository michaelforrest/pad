import("etherpad.log");
import("etherpad.utils.*");
import("plugins.openid.models.openidSession");
import("plugins.openid.models.openidConsumer");

function renderAuthentication(){
	return openidSession.isLoggedIn() ? openidSession.getUserName() : renderTemplateAsString('loginForm.ejs', {}, ['openid']);

}
function onRequest(){
	if(request.method == "POST") return create();
	if(request.params['open_id_complete']) return completeLogin();
	return false;
}

function create(){
	response.write("POSTED TO OPENID with " + request.params.openid_url);
	response.write("   " + openidConsumer.OpenidConsumer );
	var consumer = new openidConsumer.OpenidConsumer( {openid_url: request.params.openid_url} );
	response.redirect(	consumer.getBeginUrl({base: 'http://localhost:9000', 
						  		return_to_path:'/ep/openid/?foo=bar',
						  		required:'email,nickname,fullname'  }));
	return true;
}
function completeLogin(){
	response.write(request.params);
	for(var e in request.params) response.write("<br>'" + e + "':'" + request.params[e] + "',"); 
	return true;
}
