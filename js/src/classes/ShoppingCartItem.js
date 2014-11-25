module.exports = (function(){
	
	function ShoppingCartItem($el) {
		this.$el = $el;
		this.$deleteButton = this.$el.find('.btn-delete');
		this.$deleteButton.on('click', this.clickhandler.bind(this));
		
	}

	ShoppingCartItem.prototype.clickhandler = function(event){
		console.log("okee remove");
	};


	ShoppingCartItem.createWithAlbum = function(album) {
		return new ShoppingCartItem(album);
	};




	return ShoppingCartItem;
})();