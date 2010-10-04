

function padHierarchyInit() {
  this.hooks = ['aceInitOuterdocbodyHead'];
  function scriptTag(path){
     return "\'<script src=\""+path+"\" type=\"text/javascript\" charset=\"utf-8\"/>\'";
  }
  this.aceInitOuterdocbodyHead = function(args){
      // Do I need to include jquery here??
      args.iframeHTML.push(scriptTag('/static/js/jquery-1.3.2.js'));
      args.iframeHTML.push(scriptTag("/static/js/plugins/padHierarchy/content_form_inserter.js"));
  }
  
}


padHierarchy = new padHierarchyInit();


          