d3.json('data/table_data.json').then(function(data) {
	
	function tabulate(data, columns) {
		var table = d3.select('body').append('table')
		
		console.log(table)
		
		var thead = table.append('thead')
		
		console.log(table)
		var	tbody = table.append('tbody');
		console.log(table)
		
		// console.log(d3.keys(data[2]));
		//
		// console.log(d3.values(data));
		//
		// console.log(data.filter(function(d){ return d.ccd_id == "1" }))

		// append the header row
		thead.append('tr')
			.selectAll('th')
		  	.data(columns).enter()
		  	.append('th')
		    .text(function (column) { return column; });

		// create a row for each object in the data
		var rows = tbody.selectAll('tr')
		  	.data(data)
		  	.enter()
		  	.append('tr');

		// create a cell in each row for each column
		var cells = rows.selectAll('td')
		  	.data(function (row) {
				return columns.map(function (column) {
					return {column: column, value: row[column]};
				});
			})
			.enter()
		  	.append('td')
		  	.text(function (d) { return d.value; });
		
		console.log(table)  
		return table;
	}

	// render the table(s)
	tabulate(data, d3.keys(data[0]));

});

// function loadJSON(callback) {
//
//     var xobj = new XMLHttpRequest();
//         xobj.overrideMimeType("application/json");
//     xobj.open('GET', 'data/table_data.json', true); // Replace 'my_data' with the path to your file
//     xobj.onreadystatechange = function () {
// 		console.log(xobj.readyState, xobj.status);
//           if (xobj.readyState == 4 && xobj.status == "200") {
//             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
// 			  console.log(xobj.responseText)
//             callback(xobj.responseText);
//           }
//     };
//     xobj.send(null);
//  }
//
//  console.log('xxx');
//
// function init() {
//   loadJSON(function(response) {
//    // Parse JSON string into object
//      var actual_JSON = JSON.parse(response);
// 	 console.log(actual_JSON.count);
//   });
// }


