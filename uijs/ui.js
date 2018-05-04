/*

	UI js : Lazy Garage solution for SPAs
	Author: aakash.pandey@live.com
	

*/

var Path = {

//  HASH : DIV ID

	     "": "def",
	"about": "abt",
	"howto": "ins",
	 "samp": "smp"
};


// -----------------------------------------------------------------


var uNav=(p)=>{
	cp=Path[location.hash.slice(1,)];if(!p){$(".ui").hide()
	if(cp){$(`#${cp}`).fadeIn()}else{$("#e").fadeIn()}}else{if(cp){$(`#${cp}`).hide();history.pushState({path:'app'},"",`${location.origin}${location.pathname}#${p}`);$(`#${Path[p]}`).fadeIn()}else{$("#e").fadeIn()}}
}

$(document).ready(() => {
  $(window).on('hashchange', () => {
    uNav();
  }).trigger('hashchange');
});
