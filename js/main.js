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
            url: 'https:api.knackhq.com/v1/scenes/scene_1/views/view_1/records'
          , type: 'GET'
          , headers: {
                'X-Knack-Application-Id': '536a5467d0d46fbc0c647e7e'
              , 'X-Knack-REST-API-Key': '704052c0-d5fe-11e3-8de1-5377a2620470'
            }
          , success: function(data) {
                
                var arr = [];
                for(x in data.records){
					var btn = "<a class='fa fa-fw fa-pencil-square-o' href='edit-data.html?id="+data.records[x].id+"'></a>"
							+ "<a class='delete fa fa-fw fa-trash-o' href='#' data-id='"+data.records[x].id+"'></a>";

                    arr.push(
                        {
                            Name : data.records[x].field_1,
                            Address : data.records[x].field_14,
                            Email : data.records[x].field_15,
                            Status : btn
                        }
                    );
                    
                }
                
                $('#records').dataTable({
                    "data": arr,
                    "columns": [
                        { "data": "Name" },
                        { "data": "Address" },
                        { "data": "Email" },
                        { "data": "Status" }
                    ]
                });
            }
		  ,complete: function(data){
		  
			$('.delete').click(function(){
	
				var id = $('.delete').attr('data-id');
				
				return false;
			});
			
		  }
        }); 
		
		
		
});



function delete1(){


}


//Init Edit Data
$(document).on('pageshow','#edit-data-page', function(){
	
	var id = getUrlVars()['id'];
	
    $.ajax({
            url: 'https://api.knackhq.com/v1/scenes/scene_5/views/view_5/records/'+id
          , type: 'GET'
          , headers: {
                'X-Knack-Application-Id': '536a5467d0d46fbc0c647e7e'
              , 'X-Knack-REST-API-Key': '704052c0-d5fe-11e3-8de1-5377a2620470'
            }
          , success: function(data) {
                
                $('#inputName').val(data.field_1);
				$('#inputAddress').val(data.field_14);
				$('#inputEmail').val(removeHtmlTag(data.field_15));
                
            }
    });
	
	
	var form = $('#frmEdit');
    
    $(form).validate({
        submitHandler: function( form ) {
		
			$.ajax({
					url: 'https://api.knackhq.com/v1/scenes/scene_5/views/view_5/records/'+id+'/?format=both'
				    ,type: 'PUT'
				    ,data: {
                            "field_1":$('#inputName').val(),
                            "field_14":$('#inputAddress').val(),
                            "field_15":$('#inputEmail').val()
					}
				    ,headers: {
						'X-Knack-Application-Id': '536a5467d0d46fbc0c647e7e'
					  , 'X-Knack-REST-API-Key': '704052c0-d5fe-11e3-8de1-5377a2620470'
					}
					,success: function(data) {
						$('.message').html(notify('has-success' , 'fa-check', 'Update successful.'));
					}
					,error: function(data){
						var array = JSON.parse(data.responseText);
						$('.message').html(notify('has-error' , 'fa-warning',array.errors[0].message));
					}
			}); 
		
        }
    });
    
});



//Init Test Page
$(document).on('pageshow','#test-page', function(){
	
	var id = '536a5522bbf650762a8f9225';
	
    $.ajax({
            url: 'https://api.knackhq.com/v1/scenes/scene_5/views/view_5/records/'+id
          , type: 'GET'
          , headers: {
                'X-Knack-Application-Id': '536a5467d0d46fbc0c647e7e'
              , 'X-Knack-REST-API-Key': '704052c0-d5fe-11e3-8de1-5377a2620470'
            }
          , success: function(data) {
                
                $('#inputName').val(data.field_1);
				$('#inputAddress').val(data.field_14);
				$('#inputEmail').val(removeHtmlTag(data.field_15));
                
            }
    });
	
	
	var form = $('#frmEdit');
    
    $(form).validate({
        submitHandler: function( form ) {
		
			$.ajax({
					url: 'https://api.knackhq.com/v1/scenes/scene_5/views/view_5/records/'+id+'/?format=both'
				    ,type: 'PUT'
				    ,data: {
                            "field_1":$('#inputName').val(),
                            "field_14":$('#inputAddress').val(),
                            "field_15":$('#inputEmail').val()
					}
				    ,headers: {
						'X-Knack-Application-Id': '536a5467d0d46fbc0c647e7e'
					  , 'X-Knack-REST-API-Key': '704052c0-d5fe-11e3-8de1-5377a2620470'
					}
					,success: function(data) {
						$('.message').html(notify('has-success' , 'fa-check', 'Update successful.'));
					}
					,error: function(data){
						var array = JSON.parse(data.responseText);
						$('.message').html(notify('has-error' , 'fa-warning',array.errors[0].message));
					}
			}); 
		
        }
    });
	
});


//Strip Html Tags
function removeHtmlTag(string){
	return string.replace(/<(?:.|\n)*?>/gm, '');
}


//Get URL data
function getUrlVars(link) {
    
    if (typeof(link) == 'undefined') {
        var url = window.location.href;
        var vars = {};
        var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
    }else{
        var url = link;
        var vars = {};
        var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
    }
    
    return vars;
}


//Notification Message Helper
function notify(className, iconName, message){

	var html = '<div class="form-group '+className+'">'
			 + '<label class="control-label">'
			 + '<i class="fa '+iconName+'"></i> '+message+'</label>'
			 + '</div>';
	
	return html;
}

$(document).on('pageinit','[data-role=page]', function(){
	loadMenu();
});

