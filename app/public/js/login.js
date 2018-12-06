$(document).ready(function () {
    function login(event) {
        event.preventDefault();
        var user = {
            username: $("#login-username").val().trim(),
            password: $("#login-password").val().trim()
        };
        console.log(user);
        $.ajax({
            url: `./api/${user.username}`,
            method: "GET"
        }).then(function (data) {
            console.log(data);
            $("#userWatchlist").empty(); 
            alert("Thanks " + data.username + " Logged In!");
            $("#userWatchlist").text(data.username + "'s Watchlist");
            window["globalUser"]=data;
        }).catch(function (err) {
            console.log("this is the error", err)
        })
    }
    $("#login-submit").on("click", login);
})
