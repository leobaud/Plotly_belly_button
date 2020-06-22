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
  // buildgaugeCharts(newSample)
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
      l: 100,
      r: 60,
      t: 10,
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

// function buildgaugeCharts(sample){
//   d3.json("samples.json").then((data) => {
//   var samples3 = data.metadata;
//   var graphtArray3 =samples3.filter(sampleObj => sampleObj.id == sample);
//   var resultSamples3 = graphtArray3[0]
//   console.log(resultSamples3);
 
 
//   var sampleData3 = resultSamples3.wfreq
//     console.log(sampleData3)

//     var data3 = [
//       {
//         domain: {sampleData3},
//         // value: 270,
//         title: { text: "Speed" },
//         type: "indicator",
//         mode: "gauge+number"
//       }
//     ];
    
//     var layout3 = { width: 450, height: 400, margin: { t: 0, b: 0 } };
   
//   Plotly.newPlot("gauge", data3, layout3);

//   });
// }
