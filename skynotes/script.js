var Index=0, E="";

if (localStorage.Index > 0) {
	Index = localStorage.Index;
	document.getElementById('list').innerHTML = localStorage.Data;
}

var init = () => {
	$("#view").hide();
	$("#write").hide();
	$("#about").hide();
	$("#list").fadeIn();
}



var act=(n) => {
	if (n===0) {
		history.pushState({path: 'root'}, "Read notes", "/");	
	} else if (n===1) {
		history.pushState({path: 'write'}, "Create new notes", "write");
	} else if (n===2) {
		history.pushState({path: 'about'}, "About SkyNotes", "about");
	} else {
		history.pushState({path: 'view'}, "Read or edit", "view");
	}

	urlScan();
}

var urlScan = () => {
	if (location.pathname === '/skynotes') {
		init();
	} else if (location.pathname === '/write') {
		E="";
		$('#title').val(null);
		$('#note').val(null);
		$("#list").hide();
		$("#about").hide();
		$("#write").fadeIn();
	} else if(location.pathname === '/about') {
		$("#list").hide();
		$("#write").hide();
		$("#about").fadeIn();
	} else if(location.pathname === '/view') {
		$("#list").hide();
		$("#write").fadeIn();
	}
}

$(window).on('popstate', function (e) {
	urlScan();
});

$('#view').css("visibility", "visible");
init();
$('body').css("visibility", "visible");



var save = (e) => {
	if (E==="") {
		var title = $('#title').val();
		var body = $('#note').val();
		
		eNote = `<div class="wrap"><div class="note" value=${Index}>
		<span class="title">${title}</span>
		<span class="body">${body}</span></div></div>`
		prev = document.getElementById('list').innerHTML
		document.getElementById('list').innerHTML = eNote + prev;
		Index++;
		act(0);
	} else {
		E.currentTarget.firstChild.childNodes[1].innerText = $('#title').val();
		E.currentTarget.firstChild.childNodes[3].innerText = $('#note').val();
		act(0);
	}

	$('#title').val(null);
	$('#note').val(null);
	localStorage.Index = Index;
	localStorage.Data = document.getElementById('list').innerHTML;
}

var view = (a, b) => {
	$('#title').val(a);
	$('#note').val(b);
	act(3);
}

$("#list").on("click", ".wrap", function (e) {
	var cur = e.currentTarget.children[0].attributes[1].value;
	// console.log(e)
	// alert(e.currentTarget.children["0"].childNodes["0"].nextElementSibling.title)
	title = e.currentTarget.firstChild.childNodes[1].innerText;
	body = e.currentTarget.firstChild.childNodes[3].innerText
	E=e;
	view(title, body);

});

var reset = () => {
	var r = confirm("Are you sure ?");
	if (r === true) {
		var Index=0, E="";
		localStorage.Index=0;
		localStorage.Data="";
		window.location = "/";
	}
}

$('#note').focus(()=> {
		$('html,body').scrollTop(0);
	}

)


var rm = () => {
	try {
		E.currentTarget.outerHTML="";
		localStorage.Data = document.getElementById('list').innerHTML;
		act(0);
	} catch(e) {
		alert('No saved notes to delete')
	}

}
