//= require Studyers.miscTools
//= require Studyers.textEditor
//= require Studyers.drawEditor
//= require Studyers.graphEditor
//= require Studyers.wikiFinder
//= require Studyers.classResources

/*
	Editor V2.0 
	@Author: Shlomi Zadok.
	@project: Studyers
*/

$(document).ready(function() {
  
  // $("#swiper").live('click', function(e) {
  //   $(this).toggleClass("open");
  //    $("#note-take").toggleClass("left");
  //    $("#lesson-helpers").toggleClass("open");
  //  });
  
  $('#share-lesson-form h3').live('click', function(e) {
    $(this).nextAll().toggle();
  })

  $(".remove-object").live('click', function(e) {
    if (confirm("Really remove this?")) {
      $(this).parent().remove();
    } else {
      return false;
    }
    
  });
  
  $(".graph-remove").live('click', function(e) {
    $(this).next("img").remove();
    $(this).remove();
  })
  
  // $(".resource").live('click', function(e) {
  //   e.preventDefault();
  //   $(".pull-resource").hide();
  //   var option = $(this).attr("id") + "-form";
  //   $("#side-resources").show("slide", {direction: "right"});
  //   $("#" + option).show("slide", {direction: "right"});
  //   //$("#text-editor").addClass("minified");
  //   modifyCanvasAndImageWidth();
  // });
  
  $(".pull-resource .close, .pull-resource .close-btn").live('click', function(e) {
    e.preventDefault();
    $("#side-resources").hide("slide", {direction: "right"});
    $("#text-editor").removeClass("minified");
    modifyCanvasAndImageWidth();
  });
  
  $("#lesson_shares_attributes_0_shared_token").tokenInput("/users.json", {
    crossDomain: false,
    prePopulate: $("#lesson_shares_attributes_0_shared_token").data("pre"),
    theme: 'facebook',
    hintText: 'Type in friends names...'
  });
  
  var lessonText = $("#lesson_body").val();
  //console.log(lessonText);
  $("#lesson_body").hide();
  $("#lesson_body").after('<div id="text-editor"></div>');
  var text = new TextEditor();
  text.showControls();
  if (lessonText)
    text.savedText(lessonText);


  $("#add-text").click(function() {
    var text = new TextEditor();
    text.showControls();
  });

  $(".text-after").live('click', function() {
    var putAfter = $(this).attr('after');
    var text = new TextEditor(putAfter);
    text.showControls();
  });

  $(".draw-after").live('click', function() {
    var putAfter = $(this).attr('after');
    var ID = uniqueId();
    var draw = new DrawEditor(ID, putAfter);
    draw.drawInit(ID);
  });
  
  $(".graph-after").live('click', function() {
    var putAfter = $(this).attr('after');
    var ID = uniqueId();
    var graph = new graphEditor(ID, putAfter);
  });
  
  $("#add-draw").click(function() {
    var ID = uniqueId();
    var draw = new DrawEditor(ID);
    draw.drawInit(ID);
  });

  $("#lesson_submit, #lesson_edit").click(function(e){
    
    window.onbeforeunload = null;
    
    // Cleanup tools
    $("#text-editor .buttons, #text-editor .dtool, #text-editor .dont-save").remove();
    // create images from canvases
    var canvases = document.getElementsByClassName('imageView');
    for (var i = 0; i < canvases.length; i++) {
      var data = canvases[i].toDataURL();
      var container = canvases[i].parentNode;
      var img = document.createElement('img');
      img.src = data;
      container.insertBefore(img);
    }
    $(".canvas-container canvas").remove();
    $(".canvas-container img").addClass("SavedImage");
    $(".field-container").removeClass();
    $(".text").removeClass().addClass('SavedText');
    $(".SavedText div:empty").remove();
    var textSave = $("#text-editor").html();
    //console.log(textSave);
    $("#lesson_body").val(textSave);
    
    if (!$("#lesson_title").val()){
      var today = new Date();
      $("#lesson_title").val(today + "- auto title");
    }
  });
  
});


window.onbeforeunload = confirmExit;
function confirmExit() {
  return "You are about to leave a lesson note without saving.";
}


if (!window.Studyers)
  Studyers = {};

// Studyers.Selector = {};
// Studyers.Selector.getSelected = function(){
//   var t = '';
//   if(window.getSelection){
//     t = window.getSelection();
//   }else if(document.getSelection){
//     t = document.getSelection();
//   }else if(document.selection){
//     t = document.selection.createRange().text;
//   }
//   return t;
// }

// Studyers.Selector.mouseup = function(){
//   var st = Studyers.Selector.getSelected();
//   if(st!=''){
//     //alert("You selected:\n"+st);
//   }
// }

// $(document).ready(function(){
//   $(document).bind("mouseup", Studyers.Selector.mouseup);
// });