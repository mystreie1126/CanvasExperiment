function validateForm(keys){
    
    var map = {
        "form_name":"Please Enter Your Name.",
        "form_email":"Please Enter Your Valid Email.",
        "form_phone":"Please Enter Your Phone Number.",
        "form_message":"Please Enter Your Message"
    }

    if (keys == null) keys = map;

    var isValid = true;
    for(var key in keys){
        var elem = $("#"+key);

        if(!isValidElem(elem, key)){
            printError(elem, map[key]);
            isValid = false;
        }else {
            removeError(elem);
        }
    }

    return isValid;
}

function isValidElem(elem, key){
    var content = elem.val();
    switch(key){
        case "form_name": return checkEmpty(content); 
        case "form_email": return check_form_email(content); 
        case "form_phone": return check_form_phone(content);
        case "form_message": return checkEmpty(content);
        default: return false;
    }
}

function printError(elem, message){
    elem.prev("span.error").html(message);
}

function removeError(elem){
    elem.prev("span.error").html("");
}

function checkEmpty(content){
    return content.trim() != "";
}

function check_form_email(content){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(content);
}

function check_form_phone(content){
    var re = /^(?:\s*\+)?[[0-9\s\.\-]+$/;
    return re.test(content);
}

(function($){
    $.fn.makeFormValidation = function(){
        
        $('.form-control').change(function(){
            var k = this.id;
            var keys = {}; keys[k] = "";
            validateForm(keys);
        });
    }; // custom plugins 
})(jQuery);

$(document).ready(function(){
    $('.carousel').carousel({
        interval: 5000 //changes the speed
    });
    /* smooth scrolling for scroll to top */
    $('.scroll-top').click(function(){
      $('body,html').animate({scrollTop:0},1000);
    });
    $('.carousel-control').on("dragstart", function(ev){
        return false;
    });
	
	$('#submit_button').click(function(e){

        e.preventDefault();
        if(validateForm()){
            var form_data = $("#contact-form").serialize();
            ajaxRequest(form_data);
        }
    });

    
    
});

function ajaxRequest(formdata){
    $.ajax({
        type: "POST", 
        url: "foo.html",
        cache: false,
        data:  formdata, 
        dataType:'text', 
        success: function(data){
            if (data.length > 0) {
                // form message success
                $('#server_message').html(data)
                    .addClass("success").removeClass("error");;
                $("#contact").css('display','none');
                
            } else {
                // form processing failed
                $('#server_message').html(data)
                    .addClass("error").removeClass("success");;
            }
        }, 
        error: function(data){
            alert('A problem occurred sending the message! Sorry!!');
        }
    });
}


