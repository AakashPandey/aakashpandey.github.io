var nv=0, nick="", nRID="", mcol="", sk="";
$.ajaxSetup({xhrFields: {withCredentials: true}});
var sph = () => {	window.scrollTo(0, 10000); }
$('body').keydown(function(event) { var x = event.which; if (x==13) { send();} });

var rez = () => { sz=$("#mainAct").width();$("#inp").width(sz-70); if ($(window).width() < 900) $("#inp").width(sz-110); }
$(window).resize(function () { rez()});
rez();

$("#nav").click(() => {
	if (nv===0) {
		$("#nav").html(`<i class="fa fa-circle" aria-hidden="true"></i>`);
		$("#side").anim('fadeInLeft')
		$("#side").show();
		nv=1;
	} else {
		$("#nav").html(`<i class="fa fa-circle-o" aria-hidden="true"></i>`);
		$("#side").anim('fadeOutLeft', hd);
		nv=0;
	}
})

var hd = () => {
	$("#side").hide();
}

$("#nav").hide();
$("#side").hide();

// $("#inAct").hide();
$("#preAct").hide();
$("#mainAct").hide();

var randr = () => {
	$('#nroom').val("aph"+Math.random().toString(36).substr(2, 7));
}

var sks = () => {
	sk = Math.random().toString(36).substr(2, 5);
}

var act = (lvl) => {
	if (lvl===1) {
		nick = $("#nick").val().toLowerCase();
		if (nick==="" || nick===" ") {
			alert("Nick can't be empty");
			$("#nick").val(null);
		} else if (nick.includes(" ")) {
			alert("Nick can't contain spaces");
			$("#nick").val(null);
		} else {
			$("#nick").val(null);
			$("#inAct").hide();
			$("#preAct").fadeIn();
		}

	} else if(lvl===2) {
		nRID = $("#nroom").val().toLowerCase();
		if (nRID.length < 7) {
			alert("Room ID should be of at least 7 Al-Nu")
			$("#nroom").val(null);
		} else {
			$("#preAct").hide();
			URL = URL + nRID;
			rece();
			$("#nav").show(800);
			cMT();
			$("#mainAct").fadeIn();
		    $("#rcc").val(nRID);
		    rez();
		    reqp();


		}

	} else if(lvl===3) {
		RID = $("#room").val().toLowerCase();
		if (RID.length < 7) {
			alert("Room ID should be of at least 7 Al-Nu")
			$("#room").val(null);
		} else {
			$("#preAct").hide();
			URL = URL + RID;
			rece();
			$("#nav").show(800);
			cMT();
			$("#mainAct").fadeIn();
		    $("#rcc").val(RID);
		    rez();
		    reqp();
		}
	}

}


var cMT = () => {
    var r = Math.floor((Math.random()*tc.length) + 0);
    $('meta[name=theme-color]').remove();
    $('head').append('<meta name="theme-color" content="'+tc[r]+'">');
    $("#subm").css("background",tc[r]);
    mcol = tc[r].replace("#", "c");
    $("#you").text(nick+' (you)');
    $("#you").addClass(mcol);
    sks();

}	

// var joind = () => {
// 	var data = {jd: nick, sk: sk};
// 	data = JSON.stringify(data);
// 	$.post(URL, data); 
// }

// var leftd = () => {
// 	var data = {ld: nick};
// 	data = JSON.stringify(data);
// 	$.post(URL, data);
// }

var pulse = () => {
	var data = {on: nick, sk: sk};
    data = JSON.stringify(data);
	$.post(URL, data);
}

var reqp = () => {
	var data = {reqp: '1', sk: sk }
    data = JSON.stringify(data);
	$.post(URL, data);
}

var send = () => {
	var msg = $("#inp").val();
	$("#inp").val(null);
	var tmp = eval(rbt).text(msg);
	tmp.addClass(mcol);
	$("#disp").append(tmp);
	sph();
	var data = {nick: nick, msg:msg, col:mcol, sk: sk};
	data = JSON.stringify(data);

	if (msg!==''||msg!==' ') {
		 $.post(URL, data); 
	}
}

var rece = () => {	
  $.get(URL).done(function(data) {
  	data =  JSON.parse(data);
  	if (data.sk === sk) {

  	} else {
  		// console.log(data);

  		if (data.on!==undefined) {
  			var prev = $("#olist").text();
  			if (!prev.includes(data.on)) {
	  			$("#olist").append(data.on+"\n");
	  		}

  		} else if (data.reqp!==undefined) {
  			pulse();
  			// reqp();
  		
  		} else {
	  		tmp = eval(nbt);
	  		tmp.text(data.nick);
	  		tmp.addClass(data.col);
	  		$("#disp").append(tmp);

	  		tmp = eval(lbt);
	  		tmp.text(data.msg);
	  		tmp.addClass(data.col);
	  		$("#disp").append(tmp);
	  		sph();
  		}
  	}
    rece();
  })
}

window.onbeforeunload = function() {
 	// leftd();
}