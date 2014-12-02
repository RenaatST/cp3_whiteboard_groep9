module.exports = (function(){
	function UserHandler() {

		$("#addUserbtn").on("click",function(event) {
			$(".selectoverlay").removeClass("hidden");
		});

		$(".closebtn").on("click", function(event) {
			$(".selectoverlay").addClass("hidden");
		});


	}

	UserHandler.prototype.submitHandler = function(event) {
	};

	return UserHandler;
})();