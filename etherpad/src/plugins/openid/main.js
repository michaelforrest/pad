import("etherpad.log");
import("plugins.openid.controllers.openidController");
import("plugins.openid.hooks");
function openidInit(){
	this.hooks = ['renderAuthentication','handlePath'];
	this.description = "OpenID-based authentication (requires template changes. probably.)";
	this.renderAuthentication = openidController.renderAuthentication;
	this.handlePath = hooks.handlePath;
	this.install = install;
	this.uninstall = uninstall;
}


function install() {
 log.info("Installing openid plugin");
}

function uninstall() {
 log.info("Uninstalling openid plugin");
}

