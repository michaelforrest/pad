/**
 * THIS PLUGIN IS NOT READY TO BE MERGED JUST YET...
 * 
 * This plugin allows documents to be arranged hierarchically
 * and presented independently of the editing environment in
 * a variety of formats.
 * 
 * A goal is to limit access to the edit mode (denoted by urls
 * ending with /+edit ) to a set of contributors based
 * on openid-based authentication.
 *  
 */
import("sqlbase.sqlobj");
import("sqlbase.sqlbase");
import("sqlbase.sqlcommon");
import("etherpad.log");
import("plugins.padHierarchy.static.js.main");
import("plugins.padHierarchy.hooks");

function padHierarchyInit() {
 this.hooks = ['handlePath','aceInitInnerdocbodyHead','aceInitOuterdocbodyHead'];
 this.client = new main.padHierarchyInit(); 
 this.description = 'Allows groups of documents to be found and created based on url structure.';
 //this.renderPageBodyPre = main.renderPageBodyPre;
 this.handlePath = hooks.handlePath;
 this.aceInitInnerdocbodyHead = padHierarchyInit.aceInitInnerdocbodyHead;
 this.aceInitOuterdocbodyHead = padHierarchyInit.aceInitOuterdocbodyHead;
 this.install = install;
 this.uninstall = uninstall;
}

function install() {
 log.info("Installing padHierarchy");
 sqlobj.addColumns('PAD_SQLMETA', {
   //permalink: "varchar(128) character set utf8 collate utf8_bin",
   //parent_id: "varchar(128) character set utf8 collate utf8_bin"
  });
  sqlobj.addColumns()
  /*
   * CREATE PATH RECORDS FOR EACH EXISTING PAD IF THESE DON'T ALREADY EXIST
   */
   log.info("Creating path records for existing documents..");
   var allPads = sqlobj.selectMulti("PAD_SQLMETA",{});
   for(var i = 0; i < allPads.length; i++){
   	var pad = allPads[i];
	if(!pad.permalink){
		log.info("creating path mapping for " + pad.id);
		sqlobj.update("PAD_SQLMETA",{id:pad.id}, {permalink:pad.id });
	}

   }
}

function uninstall() {
 log.info("Uninstalling padHierarchy");
}
