(function(){


	var ShoppingCartApplication = require("./classes/ShoppingCartApplication");

	function init() {
		//TODO: maak een instantie aan van de ShoppingCartApplication class

		new ShoppingCartApplication($('.app'));
	}

	init();
})();