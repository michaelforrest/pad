import("etherpad.pad.padusers");
import("etherpad.sessions");
import("etherpad.sessions.getSession");
function getUserName(){
	var session = getSession();
	return padusers.getUserName() + " from session " + session + " with user " + session.openid_user;
}
function isLoggedIn(){
	return getSession().openid_user != null;
}
