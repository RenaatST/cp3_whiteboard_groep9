!function t(e,i,n){function a(o,s){if(!i[o]){if(!e[o]){var l="function"==typeof require&&require;if(!s&&l)return l(o,!0);if(r)return r(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var p=i[o]={exports:{}};e[o][0].call(p.exports,function(t){var i=e[o][1][t];return a(i?i:t)},p,p.exports,t,e,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)a(n[o]);return a}({1:[function(t){!function(){function e(){new i($(".app"))}var i=t("./classes/ShoppingCartApplication");e()}()},{"./classes/ShoppingCartApplication":2}],2:[function(t,e){e.exports=function(){function e(t){this.$el=t,this.$cartitemslist=t.find(".cart-items-list"),this.cartitems=[],this.$cartitemslist.find(".cart-items-list").each(function(t,e){var n=new i($(e));this.cartitems.push(n)}.bind(this)),this.cartselection=new n(t.find(".dropdown-select")),bean.on(this.cartselection,"addAlbum",this.addAlbumHandler.bind(this)),console.log(this.cartitems),$(".cart-items-list").empty();var e=$("#dropdowntemplate").text(),r=Handlebars.compile(e);r(a),a.forEach(function(t){$(".dropdown-select").append($(r(t)))}),this.putIn(),this.total=0,$(".btn-delete").on("click",this.clickhandler())}var i=t("./ShoppingCartItem"),n=t("./ShoppingCartSelection"),a=[{id:1,title:"Lieve Schat",artist:"Frans Bauer",image:"images/frans-bauwer-lieve-schat.jpg",price:9.99},{id:2,title:"30",artist:"Bart Kaëll",image:"images/bart-kaell-30.jpg",price:8.99},{id:3,title:"Zingt Adamo",artist:"Luc Steeno",image:"images/luc-steeno-zingt-adamo.jpg",price:9.99},{id:4,title:"De Sleutel Van Mijn Hart",artist:"Lindsay",image:"images/lindsay-de-sleutel-van-mijn-hart.jpg",price:9.99},{id:5,title:"De Allermooiste 40 jaar carriëre",artist:"Danny Fabry",image:"images/danny-fabry-de-allermooiste-40-jaar-carriere.jpg",price:8.99}];return e.prototype.addAlbumHandler=function(){var t=a[$("select").val()-1];this.cartitems.push(t),this.total+=t.price,this.putIn()},e.prototype.putIn=function(){$(".cart-items-list").empty();var t=parseFloat(this.total);console.log(t);var e=document.getElementById("totaalbedraghtml"),i=document.getElementById("totaalaantal");this.total>0&&(e.innerHTML=this.total,i.innerHTML=this.cartitems.length);var n=$("#maintemplate").text(),r=Handlebars.compile(n);r(a),this.cartitems.forEach(function(t){$(".cart-items-list").append($(r(t)))})},e.prototype.clickhandler=function(){console.log("removeeeee")},e}()},{"./ShoppingCartItem":3,"./ShoppingCartSelection":4}],3:[function(t,e){e.exports=function(){function t(t){this.$el=t,this.$deleteButton=this.$el.find(".btn-delete"),this.$deleteButton.on("click",this.clickhandler.bind(this))}return t.prototype.clickhandler=function(){console.log("okee remove")},t.createWithAlbum=function(e){return new t(e)},t}()},{}],4:[function(t,e){e.exports=function(){function t(t){this.$el=t,$("select").on("change",this.submitHandler.bind(this))}return t.prototype.submitHandler=function(t){t.preventDefault(),bean.fire(this,"addAlbum",$("select").val())},t}()},{}]},{},[1]);