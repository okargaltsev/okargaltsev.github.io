"use strict";

$(document).ready(function () {

    var tbl_hdrs = JSON.parse('["ObsID","Exposure, ks","# objects","Download"]');

    // var headers = '["ObsID","ccd_id","bin","Src counts","Bkg counts", \
    // 			"Area, arcsec^2","X","Y","R.A.","Decl.","S/N ratio","Exposure, ks"]';

    $.getJSON('webdata_new/web.json', function (jsn) {


        var ht = '<thead><tr><th>' +
            tbl_hdrs.join('</th><th>') +
            '</th></tr></thead><tbody>';
        
        //console.log(jsn)    

        var row_ind = 0;
        var cls;
        for (var id in jsn) {

            //console.log(id, jsn[id].lassos);
            //console.log(Object.keys(jsn[id].lassos));

            var laskeys = {};
            var laslen = 0;
            if (typeof jsn[id].lassos !== 'undefined') {
                laskeys = Object.keys(jsn[id].lassos);
                laslen = laskeys.length;
            }

            cls = 'odd';
            if (row_ind % 2 == 0) {
                cls = 'even';
            }

            ht += `<tr class="click ${cls}" id=${id}><td>` +
                [id, jsn[id].exp, laslen, 
                `<a href=${jsn[id].url}>evt2</a> 
                <a href=scaled/${id}_scaled.json.gz>xy</a>`].join('</td><td>') +
                '</td></tr>';

            var img_name = 'webdata/' + id + '.jpeg';

            row_ind++;

            //console.log(jsn[id])


            ht += `<tr class="blank hdbl"><td colspan=${tbl_hdrs.length}></td></tr>`;

        }
        ht += '</tbody>';

        //<a href="${url}"><img src="${img_name}"></img>
        //console.log(ht);

        $("<table/>", {
            html: ht
        }).appendTo("body");

        $('.hdbl').hide();

        $('.click').click(function (event) {

            var $r = $(this).next();

            var id = $(this).attr('id');

            if ($r.hasClass('blank')) {

                //var laskeys = Object.keys(jsn[id].lassos);

                var smalltable = {};

                var ht = '<div class="container">';

                ht += `<svg viewBox="0 0 ${jsn[id].box_x} ${jsn[id].box_y}" xmlns="http://www.w3.org/2000/svg" width="80%">`;

                ht += `<image href="webdata/${id}.jpeg" width="100%" />`;

                var laskeys = {};
                var laslen = 0;
                if (typeof jsn[id].lassos !== 'undefined') {
                    laskeys = Object.keys(jsn[id].lassos);
                    laslen = laskeys.length;
                }



                //console.log(laskeys);
                if (laslen > 0) {
                    laskeys.forEach(function (value, index, array) {
                        ht += `<polygon class="${id} ${value}" points="`;

                        var c = jsn[id].lassos[value].coords;

                        for (var j = 0; j < c.length; j++) {
                            ht += c[j];
                            if (j % 2 == 0) {
                                ht += ',';
                            }
                            ht += ' ';
                        }

                        ht += '" />';

                        var pd = jsn[id].lassos[value];

                        smalltable[value] = `<div class="topleft" id="${id + '_' + value}"><table>
                <tr><td>ccd_id</td><td>${pd.ccd_id}</td></tr>
                <tr><td>bin</td><td>${pd.bin}</td></tr>
                <tr><td>Region id</td><td>${value}</td></tr>
                <tr><td>Src counts</td><td>${Math.round(pd.src)}</td></tr>
                <tr><td>Bkg counts</td><td>${pd.bkg}</td></tr>
                <tr><td>Area, arcsec^2</td><td>${pd.area}</td></tr>
                <tr><td>X</td><td>${pd.x}</td></tr>
                <tr><td>Y</td><td>${pd.y}</td></tr>
                <tr><td>R.A.</td><td>${pd.ra}</td></tr>
                <tr><td>Decl.</td><td>${pd.dec}</td></tr>
                <tr><td>SNR ratio</td><td>${pd.SNR}</td></tr>
                </table></div>`;

                    });
                }

                //console.log();


                // var cir = jsn[id].circles;

                // for (var j = 0; j < cir.length; j++) {

                //     ht += `<circle cx="${cir[j][0]}" cy="${cir[j][1]}" r="${cir[j][2]}"  
                //         stroke="red" stroke-width="1" fill="none" />`;

                // }

                ht += '</svg></div>';

                $r.children().html(ht).removeClass('blank');
            }

            //$r.children().slideToggle('slow');
            $r.slideToggle();

            $("polygon").click(function (event) {

                var cls = $(this).attr("class").split(/\s+/);

                $(this).parents(".container").append(smalltable[cls[1]]);

                //console.log(cls);

                //alertify.alert('ff', cls).setting({transitionOff:true});

            });





        });
    });
});

