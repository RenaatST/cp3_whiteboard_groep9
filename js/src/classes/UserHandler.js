module.exports = (function(){
	function UserHandler($el) {
		$("#addUserbtn").on("click",function(event) {
			event.preventDefault();
			$("html").append("<div class='selectoverlay'></div>");
			$(".selectoverlay").append("<button type='button' class='btn btn-xs btn-danger closebtn'>close</button>").on("click" , function() {
				$(".selectoverlay").remove();
			})
		});


	}

	UserHandler.prototype.submitHandler = function(event) {
	};

	return UserHandler;
})();