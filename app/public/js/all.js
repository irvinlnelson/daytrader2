$(document).ready(function () {

    //GLOBAL VARS


    //https://api.iextrading.com/1.0/stock/aapl/quote   EXAMPLE
    var IEXurl = "https://api.iextrading.com/1.0";
    //var myStock = $('#tickerSearch').val().trim();
    //var APIquote = IEXurl + "/stock/" + myStock + "/quote"

    function getScore(arr) {
        return arr.reduce(function (acc, cv) {
            return acc + (cv.close - cv.open)
        }, 0)
    }

    //ON CLICK EVENT

    $('#tickerBtn').on('click', function () {
        event.preventDefault();
        

        // GET USER INPUT
        var myStock = $('#tickerSearch').val().trim();

        // CLEAR USER INPUT
        $('#tickerSearch').val('');

        // MAKE ALL THE API CALLS - ALL FUNCTION CALLS ARE HERE
        IEXquote(myStock);
        IEXcomp(myStock);
        IEXchart(myStock);
    });

    //WATCHLIST ON CLICK EVENT
    $('#watchBtn').on('click', function (event) {
        event.preventDefault();

        console.log("Watchlist Fired!!!");

        // GET USER INPUT
        var userStock = $('#watchSearch').val().trim();

        // CLEAR USER INPUT
        $('#watchSearch').val('');

        // MAKE ALL THE API CALLS - ALL FUNCTION CALLS ARE HERE
        // IEXquote(myStock);
        // IEXcomp(myStock);
        // IEXchart(myStock);
        watchStock(userStock);
        console.log(userStock);

        $.ajax({
            url: `./api/${globalUser.id}/${userStock}`,
            method: "PUT",
        }).then(function(data){
            console.log(data);
        }).catch(function(err){
            console.log(err)
        })
        
       
    });

    //API CALLS
    //--------------------------------------------------

    //RECENT DATA & STOCK QUOTE
    function IEXquote(myStock) {

        $.ajax({
            url: IEXurl + "/stock/" + myStock + "/quote",
            method: 'GET',
            success: function (data) {

                console.log(data);

                var companyName = data.companyName;
                console.log(companyName);

                var latestPrice = (data.latestPrice).toFixed(2);
                var changePercent = (data.changePercent * 100).toFixed(2);

                $('#card1Title').html(companyName).attr('name', companyName);
                $('#card1Detail').html(data.sector);

                $('.update').text(data.latestTime);

                $('#card2Title').html("$" + latestPrice).attr('price', latestPrice);
                $('#card3Title').html("Today's Change: " + changePercent + "%").attr('change', changePercent);

                if (changePercent > 0) {
                    $('.price').css('color', 'green');
                } else {
                    $('.price').css('color', 'red');
                }

            },
            error: function (error) {
                console.log("Error is " + error);
            },
        });
    }

    //COMPANY DATA
    function IEXcomp(myStock) {

        $.ajax({
            url: IEXurl + "/stock/" + myStock + "/company",
            method: 'GET',
            success: function (data) {

                console.log(data);

                $('#card1Comp').html(data.description);

            },
            error: function (error) {
                console.log("Error is " + error);
            },
        });
    }

    //TO GET DT SCORE
    function IEXchart(myStock) {
        $.ajax({
            url: IEXurl + "/stock/" + myStock + "/chart/3m",
            method: 'GET',
            success: function (data) {

                // console.log("call was FIRED");
                console.log(data);

                console.log(getScore(data) / data.length);
                $('.dtScore').html((getScore(data) / data.length * 100).toFixed(2))
            },

            error: function (error) {
                console.log("Error is " + error);
            }
        });
    };

    //WATCHLIST FUNCTIONS   
    function watchStock(userStock) {




        $.ajax({
            url: IEXurl + "/stock/" + userStock + "/chart/3m",
            method: 'GET',
            success: function (data) {
                //var userStock = $('#watchSearch').val().trim();
                var rowVar1 = (data[0].open).toFixed(2);
                var rowVar2 = (data[0].close).toFixed(2);

                // var rowVar3 = ((getScore(data) / data.length * 100).toFixed(2));
                // console.log(data);
                // console.log("call was FIRED");
                console.log("WATCHLIST BUTTON FIRED");
                //console.log(userStock);
                console.log(data);


                $('#watchTable').append("<tr><th>"
                    + userStock + "</th><td>"
                    + "$" + rowVar1 + "</td><td>"
                    + "$" + rowVar2 + "</td></tr>");
            },



            error: function (error) {
                console.log("Error is " + error);
            }
        });
    };
})
