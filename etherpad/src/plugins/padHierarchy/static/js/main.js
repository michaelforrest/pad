
function padHierarchyInit() {
  this.hooks = ['aceInitInnerdocbodyHead','aceInitOuterdocbodyHead'];
  function scriptTag(path){
     return "'<script src=\""+path+"\" type=\"text/javascript\" charset=\"utf-8\"/>'";
  }
  function cssInclude(path){
     return '<link rel="stylesheet" href="' + path + '" type="text/css" media="screen" charset="utf-8">';
  }
  this.aceInitOuterdocbodyHead = function(args){
      args.outerHeadContentFromPlugin.push(cssInclude('/static/css/plugins/padHierarchy/editor.css'));
  }
  this.aceInitInnerdocbodyHead = function(args){
      args.iframeHTML.push(scriptTag('/static/js/jquery-1.3.2.js'));
      args.iframeHTML.push(scriptTag("/static/js/plugins/padHierarchy/jquery.jeditable.mini.js"));
      args.iframeHTML.push(scriptTag("/static/js/plugins/padHierarchy/content_form_inserter.js"));
  }
  
}


padHierarchy = new padHierarchyInit();


          