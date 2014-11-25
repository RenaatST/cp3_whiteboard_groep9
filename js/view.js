function link() {
	var links = document.querySelectorAll("#content a"); 

	document.onkeydown = function(e){
		switch(e.keyCode) {
			case 37:
			getContent(links[0].getAttribute("href"));
			break;
			case 39:
			getContent(links[1].getAttribute("href"));
			break;
		}
	}

	for(var i = 0;i<links.length;i++) {
		links[i].addEventListener("click",function(e){
			e.preventDefault();
			getContent(this.getAttribute("href"));
		})
	}
}

function getContent(href) {
	var req = new XMLHttpRequest();
	req.onload = function() {

		//refreshen van link bovenaan
		if(window.history.pushState) {
			window.history.pushState("","",href);
		}

		var div = document.createElement("div");
		div.innerHTML = req.responseText;
		var content = div.querySelector("#content");
		var oldcontent = document.getElementById("content");
		var parent  = oldcontent.parentNode;
		var script = document.getElementsByTagName("script")[0];

		if(oldcontent){
			parent.removeChild(oldcontent);
		}

		parent.insertBefore(content,script);

		link();

	}
	req.open("get",href,true);
	req.setRequestHeader("X_REQUESTED_WITH", "xmlhttprequest");
	req.send();
}

link();