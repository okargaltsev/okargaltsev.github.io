"use strict";

$(document).ready(function () {

    

    var headers = '["ObsID","Exposure, ks","# objects","Download"]';

    var keys = JSON.parse(headers);

    // var headers = '["ObsID","ccd_id","bin","Src counts","Bkg counts", \
    // 			"Area, arcsec^2","X","Y","R.A.","Decl.","S/N ratio","Exposure, ks"]';

    $.getJSON('webdata/web.json', function (jsn) {


        var ht = '<thead><tr><th>' +
            keys.join('</th><th>') +
            '</th></tr></thead><tbody>';

        for (var id in jsn) {

            var laskeys = Object.keys(jsn[id].lassos);

            ht += '<tr><td>' +
                [id, jsn[id].exp, laskeys.length, `<a href=${jsn[id].url}>evt2</a>`].join('</td><td>') +
                '</td></tr>';

            var img_name = 'webdata/' + id + '.jpeg';

            console.log(jsn[id])
            console.log(jsn[id].lassos.length)

            // if (i == 0) {
            // 	console.log(url)
            // };

            //ht += `<tr><td colspan=${keys.length} class="hdbl"><a href="${url}"><img src="${img_name}"></a></td></tr>`;
        }
        ht += '</tbody>';

        //console.log(ht);

        $("<table/>", {
            html: ht
        }).appendTo("body");

        id = '755';

        laskeys = Object.keys(jsn[id].lassos);

        ht = `<svg viewBox="0 0 ${jsn[id].box_x} ${jsn[id].box_y}" xmlns="http://www.w3.org/2000/svg" width="80%">`;

        ht += `<image href="webdata/${id}.jpeg" width="100%" />`;

        

        console.log(laskeys);

        laskeys.forEach(function (value, index, array) {
            ht += `<polygon class="${id + '_' + value}" points="`;

            var c = jsn[id].lassos[value].coords;

            for (var j = 0; j < c.length; j++) {
                ht += c[j];
                if (j % 2 == 0) {
                    ht += ',';
                }
                ht += ' ';
            }

            ht += '" />';
        });

        //console.log(laskeys);

        ht += '</svg>';

        //console.log(ht);

        $("div.svg").html(ht);

        $("polygon").click(function (event) {

            var cls = $(event.target).attr("class");

            //console.log($target.attr("class"));

            // var json = [{ "User_Name": "John Doe", "score": "10", "team": "1" }, { "User_Name": "Jane Smith", "score": "15", "team": "2" }, { "User_Name": "Chuck Berry", "score": "12", "team": "2" }];
            // var tr;
            // for (var i = 0; i < json.length; i++) {
            //     tr = $('<tr/>');
            //     for (var j = 0; j < json[i].length; j++) { }
            //     tr.append("<td>" + json[i].User_Name + "</td>");

            //}
            //$('table').append(tr);

            alert(cls);

        });


    });
});

