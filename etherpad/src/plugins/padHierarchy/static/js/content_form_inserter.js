$(function(){
  $('body').append("<h1 id='title'>This is the document title!</h1>");
  $('#title').editable("/ep/update_pad_meta", {
      //pad_id:clientVars.padId
  });
})