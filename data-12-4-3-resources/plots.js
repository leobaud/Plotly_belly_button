// // d3.json("samples.json").then(function(data){
// //     console.log(data);
// // });

// // display the metadata of any individual from the dataset
// d3.json("samples.json").then(function(data){
//     firstPerson = data.metadata[0];
//     Object.entries(firstPerson).forEach(([key, value]) =>
//       {console.log(key + ': ' + value);});
// });

function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    optionChanged(sampleNames[0])
})}

init();



function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
  buildBubbleCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var results = resultArray[0];
      console.log(results)
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");

    Object.entries(results).forEach(([key, value]) => {
      console.log(`${key}: ${value}`)
    PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
  });
});
}

function buildCharts(sample){
  d3.json("samples.json").then((data) => {
  var samples = data.samples;
  var graphtArray =samples.filter(sampleObj => sampleObj.id == sample);
  var resultSamples = graphtArray[0]
  console.log(resultSamples);
 
 
  var sampleData = resultSamples.sample_values.slice(0,10).reverse()
  var otu_ID = resultSamples.otu_ids.slice(0,10).reverse()
  console.log(otu_ID);
  var otu_str = otu_ID.map(id => `OTU ${id.toString()}`)
  var otu_Labels = resultSamples.otu_labels.slice(0,10).reverse()
  console.log(sampleData);
  console.log(otu_str);
  console.log(otu_Labels);

  var graph1 = {
    x: sampleData,
    y: otu_str,
    text: otu_Labels,
    type: "bar",
    orientation: "h"
  };
  var data = [graph1];
  var layout = {
      margin: {
      l: 50,
      r: 50,
      t: 5,
      b: 50
    }
  };

  Plotly.newPlot("bar", data, layout);

  });
}

function buildBubbleCharts(sample){
  d3.json("samples.json").then((data) => {
  var samples2 = data.samples;
  var graphtArray2 =samples2.filter(sampleObj => sampleObj.id == sample);
  var resultSamples2 = graphtArray2[0]
  console.log(resultSamples2);
 
 
  var sampleData2 = resultSamples2.sample_values
  var otu_ID2 = resultSamples2.otu_ids
  console.log(otu_ID2);
  var otu_str2 = otu_ID2
  var otu_Labels2 = resultSamples2.otu_labels
  console.log(sampleData2);
  console.log(otu_str2);
  console.log(otu_Labels2);

  var graph2 = {
    x: otu_str2,
    y: sampleData2,
    text: otu_Labels2,
    mode: "markers",
    marker: {
      size: sampleData2,
      color: otu_str2,
            colorscale: "Portland"
    }
  
  };
  var data2 = [graph2];
  var layout2 = { xaxis: {title: "OTU ID"},
  height: 500,
  width: 1000
  };

  Plotly.newPlot("bubble", data2, layout2);

  });
}
// function buildBubbleCharts(sample){
//   d3.json("samples.json").then((data) => {
//     var samples = data.samples;
//     var graphtArray =samples.filter(sampleObj => sampleObj.id == sample);
//     var resultSamples = graphtArray[0]
//     console.log(resultSamples);
  
//     var IDs = data.samples.map(x => x.otu_ids);
//     var values_sample = data.samples.map(y => y.sample_values);
    
//     var graph2 = {
//       type: "bubble",
//       x: IDs,
//       y: values_sample,
//     }

//     var data2 = [graph2];
//     var layouts = {

//       title: "OTU IDs bubble"
//     };
  
//     Plotly.newPlot("bubble", data2, layout2);
  
//     });

  // };

  
  // var graph2 = {
  //   x: sample.otu_ids,
  //   y: sample.sample_values,
  //   text: sample.otu_labels.map(otu_label),
  //   mode: "markers",
  //   marker: {
  //     size: sample.sample_values.map((values) => values * 10),
  //     sizemode: "area",
  //     color: sample.otu_ids
  //   }
  // };

  //   var data2 = [graph2]
  //   var layout = {

  //     title: "OTU IDs bubble"
  //   };

  //   Plotly.newPlot("bubble", data, layout);

  // };


//   var samples = data.samples;
//   var graphtArray =samples.filter(sampleObj => sampleObj.id == sample);
//   var resultSamples = graphtArray[0]
//   console.log(resultSamples);
 
 
//   var sampleData = resultSamples.sample_values.slice(0,10).reverse()
//   var otu_ID = resultSamples.otu_ids.slice(0,10).reverse()
//   console.log(otu_ID);
//   var otu_str = otu_ID.map(id => `OTU ${id.toString()}`)
//   var otu_Labels = resultSamples.otu_labels.slice(0,10).reverse()
//   console.log(sampleData);
//   console.log(otu_str);
//   console.log(otu_Labels);

//   var graph1 = {
//     x: sampleData,
//     y: otu_str,
//     text: otu_Labels,
//     type: "bar",
//     orientation: "h"
//   };
//   var data = [graph1];
//   var layout = {

//     title: "OTU IDs"
//   };

//   Plotly.newPlot("bar", data, layout);
// });
// }

// d3.select("input").on("change", buildMetadata)

// }

// function buildMetadata(sample) {
//   d3.json("samples.json").then((data) => {
//     var metadata = data.metadata[0];
//     var results = Object.entries(metadata).forEach(([key, value]) =>
//       {console.log(key + ': ' + value);});
//     var PANEL = d3.select("#sample-metadata");

//     PANEL.html("");
//     PANEL.append("h6").text(results)
//   });
// }

// function buildMetadata(sample) {
//   d3.json("samples.json").then((data) => {
//     var metadata = data.metadata;
//     var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//     var result = resultArray[0];
//         var PANEL = d3.select("#sample-metadata");
//         PANEL.html("");
//         result.forEach((dataRow) => {
//       Object.values(dataRow).forEach((val) => {
//       let cell = row.append("td");
//     PANEL.append("h6").text(value)
//   })})});

