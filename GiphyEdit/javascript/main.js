
// document.querySelector(".js-go").addEventListener("click",function(e){
// 	var input = document.querySelector("input").value;
// 	searchGiphy(input);
// });

document.querySelector(".js-userinput").addEventListener("keyup",function(e){
	var input = document.querySelector("input").value;
	if(e.which == 13){
		searchGiphy(input);		
	}
});
function searchGiphy(searchResult){

	var  url = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchResult;
	var GiphyAJAXCall = new XMLHttpRequest();
		GiphyAJAXCall.open("GET",url);
		GiphyAJAXCall.send();

		GiphyAJAXCall.addEventListener("load",function(e){
			var data = e.target.response;
			pushToDOM(data);
		});
}
function pushToDOM(input){
	var response = JSON.parse(input);

	var imageUrls = response.data;
	var container = document.querySelector(".js-container");
	var html = "";
	
	imageUrls.forEach(function(image){
	    var src = image.images.fixed_height.url;
		html += "<img src=\"" + src + "\" class=\"container-image\">";

  });
	container.innerHTML = html;
}
















