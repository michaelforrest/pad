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
function init() {
 this.hooks = ['handlePath'];
 this.client = new main.init(); 
 this.description = 'Allows groups of documents to be found and created based on url structure.';
 //this.renderPageBodyPre = main.renderPageBodyPre;
 this.handlePath = hooks.handlePath;
 this.install = install;
 this.uninstall = uninstall;
}

function install() {
 log.info("Installing padHierarchy");
// sqlobj.addColumns('billing_purchase', {
//   title: "TEXT"
//  });
 sqlobj.createTable('PAD_PATH', {
   ID: 'int not null '+sqlcommon.autoIncrementClause()+' primary key',
   PATH: 'varchar(128) character set utf8 collate utf8_bin not null',
   PAD_ID: 'varchar(128) character set utf8 collate utf8_bin not null',
   
  });
  /*
   * CREATE PATH RECORDS FOR EACH EXISTING RECORD IF THESE DON'T ALREADY EXIST
   */
   log.info("Creating path records for existing documents..");
   var allPads = sqlobj.selectMulti("PAD_SQLMETA",{});
   for(var i = 0; i < allPads.length; i++){
   	var pad = allPads[i];
   	// can't see how to do a join query with sqlobj, so will make lots of db calls instead...
	var path = sqlobj.selectSingle("PAD_PATH", {PAD_ID:pad.id});
	if(!path){
		log.info("creating path mapping for " + pad.id);
		sqlobj.insert("PAD_PATH", {PAD_ID:pad.id, PATH:pad.id});
	}
	
   }
}

function uninstall() {
 log.info("Uninstalling padHierarchy");
}
