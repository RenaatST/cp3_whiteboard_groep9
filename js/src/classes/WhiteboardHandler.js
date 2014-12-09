module.exports = (function(){


	function WhiteboardHandler() {
		//ajax call voor inserten van position en notedinge
		$form = $("<form method='post' action='' style='left:200px;top:200px;></form>");
		$form.append("<textarea rows='4' cols='50' maxlength='259'></textarea>");
		$form.on("mousedown", mouseDownHandler).bind(this);
		$(".canvaszelf").append($form);

	}


	WhiteboardHandler.prototype.mouseDownHandler = function(e) {
		//mousemove en mouseup aan toevoegen
	};

	WhiteboardHandler.prototype.mouseMoveHandler = function(e) {
		//item mouseposietie laten volgen
	}; 

	WhiteboardHandler.prototype.mouseUpHandler = function(e) {
		//ajaxcall voor updaten van posities
	};

	return WhiteboardHandler;
})();