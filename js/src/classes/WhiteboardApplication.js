module.exports = (function(){

	var DragAndDropHandler = require("./DragAndDropHandler.js");
	var teller = 0;


	function WhiteboardApplication() {

		$("#addnote").on("click",this.addNote.bind(this));
		$("#addvideo").on("click",this.addvideo.bind(this));
		$("#addimg").on("click",this.addimage.bind(this));


		if(GetURLParameter("page") === "canvaspage") {
			this.getData();
		}
		
		

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
	  .done(this.getData());
	};

	WhiteboardApplication.prototype.addvideo = function() {
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=addnote", { 
			text: 'tekst',
			whiteboard_id: boardid,
			xpos: 300,
			ypos: 300,
		})
	  .done(function( data ) {
	    console.log(data);
	  });
	};

	WhiteboardApplication.prototype.addimage = function() {
		var boardid = GetURLParameter("boardid");
		$.post( "index.php?page=addnote", { 
			text: 'tekst',
			whiteboard_id: boardid,
			xpos: 300,
			ypos: 300,
		})
	  .done(function( data ) {
	    console.log(data);
	  });
	};

	WhiteboardApplication.prototype.getData = function() {
		console.log("getdata");
		var boardid = GetURLParameter("boardid");
		$.get("index.php?page=data",{"boardid":boardid})
  			.done(function(data) {



  				var postTemplateSrc = $('#postit-template').text();
				var postTemplate = Handlebars.compile( postTemplateSrc );

				var result = postTemplate(data);		
				$('.canvaszelf').append($(result));
				new DragAndDropHandler();

  			});

	};

	return WhiteboardApplication;
})();