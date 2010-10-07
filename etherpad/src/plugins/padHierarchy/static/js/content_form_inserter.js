$(function(){
  var outer = $(window.frameElement.parentElement);
  outer.prepend("<h1 id='title'>This is the document title!</h1>");
  outer.find('#title').editable("/ep/update_pad_meta", {
      submitdata:{pad_id:window.parent.parent.clientVars.padId}
  //     pad_id:clientVars.padId
   });
})