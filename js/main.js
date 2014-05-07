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

//Init Data
$(document).on('pageinit','#data-page', function(){
    
        $.ajax({
            url: 'https:api.knackhq.com/v1/objects/object_1/records'
          , type: 'GET'
          , headers: {
                'X-Knack-Application-Id': '536a5467d0d46fbc0c647e7e'
              , 'X-Knack-REST-API-Key': '704052c0-d5fe-11e3-8de1-5377a2620470'
            }
          , success: function(data) {
                
                var arr = [];
                for(x in data.records){

                    arr.push(
                        {
                            Name : data.records[x].field_1,
                            Address : data.records[x].field_14,
                            Email : data.records[x].field_15,
                            Status : "<a href='edit-data.html?"+data.records[x].id+"'>Edit</a>"
                        }
                    );
                    
                }
                console.log(arr);
                $('#records').DataTable({
                    "data": arr,
                    "columns": [
                        { "data": "Name" },
                        { "data": "Address" },
                        { "data": "Email" },
                        { "data": "Status" }
                    ]
                });
            }
        }); 
});


//Init Edit Data
$(document).on('pageinit','#edit-data-page', function(){

    $.ajax({
            url: 'https://api.knackhq.com/v1/records/536a551ebbf650762a8f921d/?format=both&callback=jQuery172017395361280068755_1399493777406&_=1399494483382'
          , type: 'GET'
          , headers: {
                'X-Knack-Application-Id': '536a5467d0d46fbc0c647e7e'
              , 'X-Knack-REST-API-Key': '704052c0-d5fe-11e3-8de1-5377a2620470'
            }
          , success: function(data) {
                
                console.log(data);
                
            }
    }); 
    
});




$(document).on('pageinit','[data-role=page]', function(){
	loadMenu();
});

