'use strict';

(function () {

    /*var $ = require('jquery');*/

    $("#warning").hide();
    var solr = require('solr-client');

    var client = solr.createClient('172.19.43.118', '8983', 'wiki');
    console.log(client);
    $('#ping').click(function () {
        client.ping(function (err, obj) {
            if (err) {
                console.log(err);
            } else {
                console.log(obj);
                $("#status").html(obj.status);
            }
        });
    });
    $('#query').click(function () {
        if ($('#queryText').val() !== '') {
            var query = client.createQuery()
                .q($('#queryText').val())
                .start(0)
                .rows(10);
            client.search(query, function (err, obj) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(obj);
                    $("#list-results").html("");
                    $("#warning").hide();

                    var newHTML = [];
                    if (obj.response.docs.length > 0) {
                        for (var i = 0; i < obj.response.docs.length; i++) {
                            newHTML.push('<li class="list-group-item">' + obj.response.docs[i].id + '</li>');
                        }
                        $("#list-results").html(newHTML.join(""));

                    } else {
                        $("#warning").show();
                    }

                }
            });
        }
        else {
            alert("Empty field");
        }
        $('#queryText').val("");

    });


})();



