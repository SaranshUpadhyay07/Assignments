document.getElementById("togglePassword").onclick = function(){
    if(document.getElementById("password").type === "text" ){
        document.getElementById("password").type = "password"
        document.getElementById("togglePassword").innerHTML = "Show";
    }
    else{
    document.getElementById("password").type = "text";
    document.getElementById("togglePassword").innerHTML = "Hide";
    }
}

    document.getElementById("email").addEventListener("input", function () {
        var emailValue = this.value;
        var emailPattern = /@/;

        if (emailPattern.test(emailValue)) {
            $("#emailpara").css("display", "none");
            $("#emailpara").removeClass("notvalid");
        } else {
            $("#emailpara").addClass("notvalid");
        }
});

$("#phone").on("input", function () {
    var phoneValue = $(this).val();

    // Remove any non-digit characters
    phoneValue = phoneValue.replace(/\D/g, '');

    // Limit to 10 digits
    if (phoneValue.length > 10) {
        phoneValue = phoneValue.substring(0, 10);
    }

    $(this).val(phoneValue); // Set the cleaned value back to input

    // Validate the final value
    var phonePattern = /^\d{10}$/;
    if (phonePattern.test(phoneValue)) {
        $("#phonepara").css("display", "none");
        $("#phonepara").removeClass("notvalid");
    } else {
        $("#phonepara").addClass("notvalid");
    }
});

$("#password").on("input", function () {
    var passwordValue = $(this).val();
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/; // At least one lowercase letter, one uppercase letter, and one digit

    if (passwordPattern.test(passwordValue)) {
        $("#passwordpara").css("display", "none");
        $("#passwordpara").removeClass("notvalid");
    } else {
        $("#passwordpara").addClass("notvalid");
    }
});

$("#conpass").on("input", function () {
    var passwordValue = $("#password").val();
    var conpassValue = $(this).val();

    if (conpassValue === passwordValue) {
        $("#confirmPass").css("display", "none");
        $("#confirmPass").removeClass("notvalid");
    } else {
        $("#confirmPass").addClass("notvalid");
    }
});

$("#smtbtn").click(function () {
    event.preventDefault();
    if (
        $("#emailpara").hasClass("notvalid") ||
        $("#phonepara").hasClass("notvalid") ||
        $("#passwordpara").hasClass("notvalid")||
        $("#confirmPass").hasClass("notvalid")
    ) {
        $("#emailpara").addClass("undo");
        $("#phonepara").addClass("undo");
        $("#passwordpara").addClass("undo");
        $("#confirmPass").addClass("undo");
        $("#unsuccessful").removeClass("undo");
        $("#read").removeClass("undo");
    } else {
         $("#emailpara").addClass("undo");
        $("#phonepara").addClass("undo");
        $("#passwordpara").addClass("undo");
        $("#confirmPass").addClass("undo");
        $("#successful").removeClass("undo");
    }
});

$("#read").click(function () {
    $("#unsuccessful").addClass("undo");
    $("#read").addClass("undo");
    $("#emailpara").removeClass("undo");
    $("#phonepara").removeClass("undo");
    $("#confirmPass").removeClass("undo");
    $("#passwordpara").removeClass("undo");
});




