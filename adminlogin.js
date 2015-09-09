function login() {
    var pass = prompt("Password: ");
    if (pass == "password")
    {
        console.log("You are an admin");   
    }
    return false;
}