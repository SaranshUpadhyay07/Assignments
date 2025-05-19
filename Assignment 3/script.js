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
    var phonePattern = /^\d{10}$/; // Only 10 digits allowed

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

$("#smtbtn").click(function () {
    event.preventDefault();
    if (
        $("#emailpara").hasClass("notvalid") ||
        $("#phonepara").hasClass("notvalid") ||
        $("#passwordpara").hasClass("notvalid")
    ) {
        $("#emailpara").addClass("undo");
        $("#phonepara").addClass("undo");
        $("#passwordpara").addClass("undo");
        $("#unsuccessful").removeClass("undo");
        $("#read").removeClass("undo");
    } else {
         $("#emailpara").addClass("undo");
        $("#phonepara").addClass("undo");
        $("#passwordpara").addClass("undo");
        $("#successful").removeClass("undo");
    }
});

$("#read").click(function () {
    $("#unsuccessful").addClass("undo");
    $("#read").addClass("undo");
    $("#emailpara").removeClass("undo");
    $("#phonepara").removeClass("undo");
    $("#passwordpara").removeClass("undo");
});




