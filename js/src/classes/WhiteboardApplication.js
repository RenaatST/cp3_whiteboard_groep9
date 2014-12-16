module.exports = (function(){

	var DragAndDropHandler = require("./DragAndDropHandler.js");
	var teller = 0;


	function WhiteboardApplication() {

		$("#addnote").on("click",this.addNote.bind(this));
		$("#videosubmit").on("submit",this.addvideo.bind(this));
		$("#imagesubmit").on("submit",this.addimage.bind(this));
		$("#addimg").on("click",this.addimage.bind(this));

		
		if(GetURLParameter("page") === "canvaspage") {
			this.getData();
		}




		$('#videomodal').on('show.bs.modal', function (event) {
  			var button = $(event.relatedTarget) // Button that triggered the modal
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
});
		$('#imagemodal').on('show.bs.modal', function (event) {
  			var button = $(event.relatedTarget) // Button that triggered the modal
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
})

	}


	function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    	for (var i = 0; i < sURLVariables.length; i++) {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) {
	            return sParameterName[1];
	        }
	    }
	}	

	WhiteboardApplication.prototype.updateNote = function() {
		console.log("updatenote");
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=canvas&boardid="+boardid+"&action=updateNote", { 
			text: '',
			whiteboard_id: boardid,
			xpos: 300,
			ypos: 300,
		})
	  .done(this.getData());
	};	 

	WhiteboardApplication.prototype.addNote = function() {
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=canvas&boardid="+boardid+"&action=addNote", { 
			text: '',
			whiteboard_id: boardid,
			xpos: 400,
			ypos: 300,
		})
	  .done(setTimeout(this.getData(),2000));
	};

	WhiteboardApplication.prototype.updateVideo = function() {
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=canvas&boardid="+boardid+"&action=updateVideo", { 
			whiteboard_id: boardid,
			xpos: 300,
			ypos: 300,
		})
	  .done(this.getData());
	};	 

	WhiteboardApplication.prototype.addvideo = function(event) {
		event.preventDefault();
		var boardid = GetURLParameter("boardid");
		var data = new FormData($('#videosubmit')[0]);
		$.ajax({
			url: 'index.php?page=canvas&boardid='+boardid+'&action=addvideo',
			type: "POST",
			data: data,
			cache: false,
	        contentType: false,
	        processData: false
		})
	};

	WhiteboardApplication.prototype.addimage = function() {
		event.preventDefault();
		var boardid = GetURLParameter("boardid");
		var data = new FormData($('#imagesubmit')[0]);
		$.ajax({
			url: 'index.php?page=canvas&boardid='+boardid+'&action=addimage',
			type: "POST",
			data: data,
			cache: true,
	        contentType: false,
	        processData: false
		}).complete(this.getData());
	};

	WhiteboardApplication.prototype.updateImage = function() {
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=canvas&boardid="+boardid+"&action=updateImage", { 
			whiteboard_id: boardid,
			xpos: 300,
			ypos: 300,
		})
	  .done(this.getData());
	};	 

	WhiteboardApplication.prototype.getData = function() {
		console.log("getdata");
		$(".postits").empty();
		$(".videos").empty();
		$(".images").empty();
		var boardid = GetURLParameter("boardid");
		setTimeout($.get("index.php?page=data",{"boardid":boardid})
  			.done(function(data) {
  				var postTemplateSrc = $('#postit-template').text();
				var postTemplate = Handlebars.compile( postTemplateSrc );

				var result = postTemplate(data);		
				$('.canvaszelf').append($(result));
				new DragAndDropHandler();

				var postTemplateSrc = $('#video-template').text();
				var postTemplate = Handlebars.compile( postTemplateSrc );

				var result = postTemplate(data);		
				$('.canvaszelf').append($(result));
				new DragAndDropHandler();

				var postTemplateSrc = $('#image-template').text();
				var postTemplate = Handlebars.compile( postTemplateSrc );

				var result = postTemplate(data);		
				$('.canvaszelf').append($(result));
				new DragAndDropHandler();

  			}),2000);
		
	};


	WhiteboardApplication.prototype.detleteitem = function(event) {
		console.log(this,event.currentTarget);
	};

	return WhiteboardApplication;
})();