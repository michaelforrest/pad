import("etherpad.utils.*");
import("etherpad.log");
import("etherpad.control.pad.pad_control");
import("sqlbase.sqlobj");
import("sqlbase.sqlbase");
import("etherpad.pad.exporthtml");
import("etherpad.pad.model");
import("etherpad.pad.padutils");
import("etherpad.sessions.getSession");
import("plugins.padHierarchy.helpers.hierarchyHelper.*");
import("etherpad.collab.ace.contentcollector.sanitizeUnicode");
import("etherpad.pad.model");
import("etherpad.pro.pro_padmeta");

function onRequest() {
	var section_path = (request.path.toString() == '/pads') ? 'pads'  :  request.path.toString().split("/pads/")[1].replace(/\/$/ , '');
	var id_filter = section_path=='pads' ? '' : section_path.replace(/\//g,"-");

	var grouped_pads = getPadsBelow(id_filter);
 
	
	renderHtml('hierarchyIndex.ejs',
		   {path:request.path,
		    grouped_pad_list:getGroupChildren(grouped_pads),
		    pads:grouped_pads,
		    selected_pad:grouped_pads},
		   ['padHierarchy']);
	return true;
}
function getPermalinkFromRequest(){
    return request.path.toString().split("/pads/")[1].replace(/\/\+edit$/, '');
}
function edit_page(){
	// let's do authentication here.
	//response.write("displayName:" + request.params.displayName);

	var permalink = getPermalinkFromRequest();
	var pad = sqlobj.selectSingle("PAD_SQLMETA", {permalink:permalink});
	var id = pad ? pad.id : permalink.replace(/\//g,"-");
	if(!pad) {
	    getSession().instantCreate = id;
    }
    var title = pad && pad.title ? pad.title : permalink;
	return pad_control.render_pad(id, {title:title});
}

function redirect_to_pads_path(){
	if (!isStaticRequest()) {
		if (request.path == '/pads') {
			return onRequest();
		} else {
			response.redirect("/pads" + request.path);
		}
	} else {
		// do something else... this static routing's a bit strange..
	}
}

function render_main(){
	response.redirect("/pads");
}

function update_pad_meta(){
    var new_title = sanitizeUnicode(request.params.value);
    var pad_id = request.params.pad_id;
    // TODO: make sure that it's not just anyone calling this action!
    
    // TODO: updated database with new title
    /*
    model.accessPadGlobal(pad_id, function(pad) {
    //pro_padmeta.accessProPad(pad_id,function(pad){
        pad.setTitle(new_title);
    });
    */
    
    sqlobj.update("PAD_SQLMETA", {id:pad_id}, {title:new_title})
    
    response.write(new_title);
    return true;
}
