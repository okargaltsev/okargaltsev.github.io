// added link

"use strict";

var keys_string = '["ObsID","ccd_id","bin","Region #","Src counts","Bkg counts", \
				"Area, arcsec^2","X","Y","R.A.","Decl.","S/N ratio","Exposure, ks"]';

var keys = JSON.parse(keys_string);

$(document).ready(function () {

    $.getJSON('data/table_data.json', function (arr) {

        var ht = '<thead><tr><th><p>' +
            keys.join('</p></th><th><p>') +
            '</p></th></tr></thead><tbody>';

        for (var i = 0; i < arr.length; i++) {

            ht += '<tr><td><p>' +
                arr[i].join('</p></td><td><p>') +
                '</p></td></tr>';

            var img_name = 'img/' + arr[i].slice(0, 3).join('_') + '.jpeg';
			
			var url = 'ftp\://cda.cfa.harvard.edu/pub/byobsid/' + arr[i][0].charAt(arr[i][0].length - 1) + 
						'/' + arr[i][0] + '/primary/';
			
			// if (i == 0) {
			// 	console.log(url)
			// };

            ht += `<tr><td colspan=${keys.length} class="hdbl"><a href="${url}"><img src="${img_name}"></a></td></tr>`;
        }
        ht += '</tbody>';

        //console.log(ht);

        $("<table/>", {
            html: ht
        }).appendTo("body");

        $("td[class='hdbl']").find("p").hide();
        $("td[class='hdbl']").find("img").hide();
        $("table").click(function (event) {
            event.stopPropagation();
            var $target = $(event.target);
            if ($target.closest("tr").attr("colspan") > 1) {
                $target.slideUp();
            } else {
                $target.closest("tr").next().find("p").slideToggle('slow');
                $target.closest("tr").next().find("img").slideToggle('slow');
            }
        });
    });
});