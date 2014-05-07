//app.initialize();


var hostname = 'http://localhost/mobile/biofem/';
var domainApi = 'http://localhost/mobile/biofem/';
var domainSite = 'http://localhost/mobile/biofem/';
var domainMobile = 'http://localhost/mobile/biofem/';    


function init()
{
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}


function loadMenu()
{
	$('.toggle-menu').click(function(){
		if ($('.menu-nav').hasClass('hide')) {
			$('.menu-nav').removeClass('hide');
			$('.menu-nav').addClass('show');
		} else if ($('.menu-nav').hasClass('show')) {
			$('.menu-nav').removeClass('show');	
			$('.menu-nav').addClass('hide');
		}
		return false;
	});	

	$('.toggle-settings').click(function(){
		if ($('.settings-nav').hasClass('hide')) {
			$('.settings-nav').removeClass('hide');
			$('.settings-nav').addClass('show');
		} else if ($('.settings-nav').hasClass('show')) {
			$('.settings-nav').removeClass('show');	
			$('.settings-nav').addClass('hide');
		}
		return false;				
	});
	
	//$('.logout').click(function(){
//                   
//		localStorage.clear();
//		var url = 'index.html';
//
//		window.location = url;
//		return false;
//	});
}

	
function checkPreAuth() {
//	console.log("checkPreAuth");
//    var form = $("#loginForm");
//    if(window.localStorage["email"] != undefined && window.localStorage["password"] != undefined) {
//        $("#email", form).val(window.localStorage["email"]);
//        $("#password", form).val(window.localStorage["password"]);
//        handleLogin();
//    }
}



function deviceReady() 
{
	console.log("deviceReady");
	//checkPreAuth();
	/*
	$("#login-page").on("pageinit",function() {
		console.log("pageinit run");
		$("#loginForm").on("submit",handleLogin);
		checkPreAuth();
	});
	*/
}

$(document).bind( "mobileinit", function() {
	// Make your jQuery Mobile framework configuration changes here!
	$.mobile.allowCrossDomainPages = true;
});


//Init Homepage
$(document).on('pageinit','#dashboard-page', function(){
    
    
});

//Init Homepage
$(document).on('pageinit','#data-page', function(){
    
        $(function() {
            $("#example1").dataTable();
        });
  
            
});







$(document).on('pageinit','[data-role=page]', function(){
	loadMenu();
});

