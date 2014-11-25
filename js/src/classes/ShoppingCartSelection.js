module.exports = (function(){



	function ShoppingCartSelection($el) {
		this.$el = $el;
		$('select').on('change', this.submitHandler.bind(this));

	}

	ShoppingCartSelection.prototype.submitHandler = function(event) {
		event.preventDefault();
		bean.fire(this, "addAlbum", $('select').val());
		
	};

	return ShoppingCartSelection;
})();