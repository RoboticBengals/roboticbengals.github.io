function login() {
    //var pass = prompt("Password: ");
    
    password_prompt("Admin Password: ", "Submit", 175, 75, function(pass) {
        $.post("adminlogin.php", {pass: pass}, function(data) {
        if (data == "true") {
            console.log("Logged in successfully");
            document.getElementById("admin_drop").style.display = 'block';
            document.getElementById('file_submit').addEventListener('click', processFormFileUpload);
        }
            
        });
    });
    
    
    
    return false;
}

window.password_prompt = function(label_message, button_message, arg3, arg4, arg5) {

    if (typeof label_message !== "string") var label_message = "Password:";
    if (typeof button_message !== "string") var button_message = "Submit";
    if (typeof arg3 === "function") {
        var callback = arg3;
    }
    else if (typeof arg3 === "number" && typeof arg4 === "number" && typeof arg5 === "function") {
        var width = arg3;
        var height = arg4;
        var callback = arg5;
    }
    if (typeof width !== "number") var width = 200;
    if (typeof height !== "number") var height = 100;
    if (typeof callback !== "function") var callback = function(password){};

    var submit = function() {
        callback(input.value);
        document.body.removeChild(div);
        window.removeEventListener("resize", resize, false);
    };
    var resize = function() {
        div.style.left = "calc(50% - " + (width / 2) + "px)";
        div.style.top = "calc(50% - " + (height / 2) + "px)";
    };

    var div = document.createElement("div");
    div.id = "password_prompt";
    div.style.background = "#333333";
    div.style.color = "black";
    div.style.border = "7px solid #444444";
    div.style.borderRadius = "25px";
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.padding = "16px";
    div.style.position = "fixed";
    div.style.left = "calc(50% - " + (width / 2) + "px)";
    div.style.top = "calc(50% - " + (height / 2) + "px)";
    div.style.transform = "transform(-50%, -50%)";
    var label = document.createElement("label");
    label.id = "password_prompt_label";
    label.innerHTML = label_message;
    label.style.fontFamily = "Lato";
    label.style.color = "#eeeeee";
    label.style.display = "block";
    label.style.textAlign = "center";
    
    
    //label.for = "password_prompt_input";
    div.appendChild(label);

    div.appendChild(document.createElement("br"));

    var input = document.createElement("input");
    input.id = "password_prompt_input";
    input.type = "password";
    input.addEventListener("keyup", function(event) {
        console.log(event.keyCode);
        if (event.keyCode == 13) 
            submit();
    }, false);
    
    input.style.background = "#666666";
    input.style.border = "3px solid #444444";
    input.style.borderRadius = "3px";
    input.style.fontFamily = 'Lato';
    input.style.color = "#eeeeee";
    input.style.textAlign = "center";
    input.style.width = "100%";
    div.appendChild(input);
    
    var button = document.createElement("button");
    button.innerHTML = button_message;
    button.addEventListener("click", submit, false);
    //div.appendChild(button);

    document.body.appendChild(div);
    window.addEventListener("resize", resize, false);
};