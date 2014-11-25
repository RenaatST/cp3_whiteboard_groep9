module.exports = (function(){

	var ShoppingCartItem = require('./ShoppingCartItem');
	var ShoppingCartSelection = require('./ShoppingCartSelection');

	var albums = [
		{
			id: 1,
			title: 'Lieve Schat',
			artist: 'Frans Bauer',
			image: 'images/frans-bauwer-lieve-schat.jpg',
			price: 9.99
		},
		{
			id: 2,
			title: '30',
			artist: 'Bart Kaëll',
			image: 'images/bart-kaell-30.jpg',
			price: 8.99
		},
		{
			id: 3,
			title: 'Zingt Adamo',
			artist: 'Luc Steeno',
			image: 'images/luc-steeno-zingt-adamo.jpg',
			price: 9.99
		},
		{
			id: 4,
			title: 'De Sleutel Van Mijn Hart',
			artist: 'Lindsay',
			image: 'images/lindsay-de-sleutel-van-mijn-hart.jpg',
			price: 9.99
		},
		{
			id: 5,
			title: 'De Allermooiste 40 jaar carriëre',
			artist: 'Danny Fabry',
			image: 'images/danny-fabry-de-allermooiste-40-jaar-carriere.jpg',
			price: 8.99
		}
	];

	function ShoppingCartApplication($el) {
		this.$el = $el;
		this.$cartitemslist = $el.find('.cart-items-list');
		this.cartitems = [];

		this.$cartitemslist.find(".cart-items-list").each(function(index, itemEl){
			var cartitem = new ShoppingCartItem( $(itemEl));
			this.cartitems.push(cartitem);
		}.bind(this));

		
		//in plaats van handmatig te verwijderen ==> $('.main').empty();

		this.cartselection = new ShoppingCartSelection($el.find('.dropdown-select'));
		bean.on(this.cartselection, 'addAlbum', this.addAlbumHandler.bind(this));
		console.log(this.cartitems);
		$('.cart-items-list').empty();

		var options = $('#dropdowntemplate').text();
		var template = Handlebars.compile(options);
		var html2 = template(albums);

		albums.forEach(function(album){
			//$('.cart-items-list').append( $(template(album)) );
			$('.dropdown-select').append( $(template(album)) );
		});

		this.putIn();

		this.total = 0;

		$('.btn-delete').on('click', this.clickhandler());
	}

	ShoppingCartApplication.prototype.addAlbumHandler = function() {
		var cartitem = albums[$("select").val() - 1];
		this.cartitems.push(cartitem);
		this.total += cartitem.price;
		this.putIn();

		
	};


	ShoppingCartApplication.prototype.putIn = function() {
		$('.cart-items-list').empty();
		var totaalbedrag = parseFloat(this.total);
		

		console.log(totaalbedrag);
		var span = document.getElementById("totaalbedraghtml");
		var span2 = document.getElementById("totaalaantal");

		if(this.total > 0){
			span.innerHTML = this.total;
			span2.innerHTML = this.cartitems.length;
		}

		
		var posts = $('#maintemplate').text();
		var template2 = Handlebars.compile(posts);
		var html2 = template2(albums);

		this.cartitems.forEach(function(album){
			$('.cart-items-list').append( $(template2(album)) );
		});



			
	};

	ShoppingCartApplication.prototype.clickhandler = function() {

		console.log("removeeeee");
	};











	return ShoppingCartApplication;
})();