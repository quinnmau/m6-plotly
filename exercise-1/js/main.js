// Main JavaScript File

// You'll have to wait for you page to load to assign events to the elements created in your index.html file
$(function() {
  // This function could help you format your data: lifted from the Plotly bubble map example:
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  // Use d3.csv to read in your `data/Mass-Shooting-Data.csv` dataset: remember, you must be running a local server
  d3.csv('data/Mass-Shooting-Data.csv', function(error, data) {
      console.log(data);
  
    var data = [{
        type: 'scattergeo',
        locationmode: 'USA-states',
        mode: 'markers',
        lat: unpack(data, 'lat'),
        lon: unpack(data, 'lng'),
        text: unpack(data, 'injured').map(function(d) {return '<b>Injured</b>: ' + d}),
        hoverinfo: 'text',
        marker: {
            size: unpack(data, 'injured').map(function(d) {return d*2}),
            color: 'red',
            opacity: .3
        }
    }];

    // Format your `data` object to pass to the plotly function. Make sure to set:
      // latitude (`lat`),
      // longitude(`lon`),
      // Marker attributes: size, color, opacity.
      // Tooltip information (which requires `text` and `hoverinfo`)


    // Declare your layout options to specify the title, projection and drawing specifications
    var layout = {
        title: 'Crowdsourced 2015 mass shootings',
        showlegend: false,
        geo: {
            scope: 'usa',
            projection: {
                type: 'albers usa'
            },
            showland: true,
            subunitwidth: 1,
            landcolor: 'rgb(190, 190, 190)',
            subunitcolor: 'white',
            countrycolor: 'rgb(150, 150, 150)'
        }
    };

    // Call your Plotly function
    Plotly.plot('map-div', data, layout);
  });
});


