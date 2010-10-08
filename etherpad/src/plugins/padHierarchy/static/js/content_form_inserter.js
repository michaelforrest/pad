$(function(){
  var outer = $(window.frameElement.parentElement);
  var clientVars = window.parent.parent.clientVars;
  outer.prepend("<h1 id='title'>" + clientVars.initialTitle + "</h1>");
  outer.find('#title').editable("/ep/update_pad_meta", {
      submitdata:{pad_id:clientVars.padId}
  //     pad_id:clientVars.padId
   });
})