//app.initialize();


var hostname = 'http://saynsnap.com/';
var domainApi = 'http://saynsnap.com/mobileapi/api/';
var domainSite = 'http://saynsnap.com/application/';
var domainMobile = 'http://saynsnap.com/mobile/';    


function init()
{
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}

function checkConnection() {
    
    if(!navigator.onLine){
        alert('Internet connection problem.');
        window.location = 'index.html';
    }
    return false;
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
	
	$('.logout').click(function(){
                   
		localStorage.clear();
		var url = 'index.html';

		window.location = url;
		return false;
	});
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


function handleLogin() {
    
    var form = $("#frmLogin");  
    
    //disable the button so we can't resubmit while we wait
    $("#submitLogin", form).attr("disabled","disabled");
    
	var e = $("#username", form).val();
	var p = $("#password", form).val();
    
    if(e != '' && p!= '') {
        $("#submitLogin",form).attr("disabled","disabled");
		$.post (domainApi + 'login', {
			username	: e,
			password	: p,
		}, function(data){
                
			if (data.status == 'success') {
                window.localStorage["username"] 	= e;
                window.localStorage["password"] = p;
                window.localStorage["user_id"] 	= data.user_id;
				
				if (window.localStorage["last_visit"] == '' || typeof window.localStorage['last_visit'] === "undefined") {
					var path = 'home.html';
				} else {
					var path = window.localStorage["last_visit"];
				}

				var home = domainMobile + path;
				
				setTimeout(function() {                           
                    path == 'home.html'
					$.mobile.changePage(path, {
						transition	: "slide",
					});
				}, 2000);

			} else {
				alert('Login Failed: Incorrect username or password');
                ajaxLoader(0);
                $("#submitLogin").removeAttr("disabled");
                navigator.notification.alert("Your login failed", function() {});
            }
		});
        
    } else {
        $("#submitLogin").removeAttr("disabled");
    }
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

$(document).on('pageinit','#login-page', function(){
         
     
    $( "#frmLogin" ).validate({
        submitHandler: function( form ) {
            ajaxLoader(1);
            checkConnection();
            handleLogin();
            
        }
    });
    
	checkPreAuth();

});	

//Init Homepage
$(document).on('pageinit','#home-page', function(){
    
});


$(document).on('pageinit','[data-role=page]', function(){
	loadMenu();
});
