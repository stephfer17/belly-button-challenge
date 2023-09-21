const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
   console.log(data);
  });
  
// displaying the sample data
function infobbox (sample) { 
d3.json(url).then(function(data) {
// getting the data
let infometa = data.metadata;
// fitler 
let fitlermeta =infometa.filter(item => item.id == sample);
// get the info from the index
let inforesults = fitlermeta[0];
// clearing out the table 
d3.select("#sample-metadata").html("");
//using objects to get the values and the keys 
Object.entries(inforesults).forEach(([key,value])=>{
d3.select("#sample-metadata").append("h5").text((`${key}: ${value}`));
});
});
};
// making the function for the first bargraph 
function samplebar(sample){
d3.json(url).then(function(data) {
// get the sample data 
let datavalues = data.samples;
// filter the data
let barvalues = datavalues.filter(item => item.id==sample);
// get the info from the index 
let graphvalues = barvalues[0];
// making the bar chart 
let trace1 = {
x:(graphvalues.sample_values).slice(0,10).reverse(),
y:(graphvalues.otu_ids).slice(0,10).map(id=>`OTU ${id}`).reverse(),
text: (graphvalues.otu_labels).slice(0,10).reverse(),
type:"bar",
orientation: "h"
};
// trace the graph and layout
let dataarray = [trace1];
Plotly.newPlot("bar",dataarray);
});
};
// making the bubble chart 
function samplebubble(sample){
  d3.json(url).then(function(data) {
  // get the sample data 
  let datavalues = data.samples;
  // filter the data
  let bubblevalues = datavalues.filter(item => item.id==sample);
  // get the info from the index 
  let graphvalues = bubblevalues[0];
  //https://plotly.com/javascript/bubble-charts/ got the format from here 
  let trace1 = {
  x:graphvalues.otu_ids,
  y:graphvalues.sample_values ,
text: graphvalues.otu_labels,
  mode:"markers",
  marker:{
    color:graphvalues.otu_ids,
    size :graphvalues.sample_values,
    colorscale:"Earth"
  }
  };
  let dataarray = [trace1];
  
  Plotly.newPlot("bubble",dataarray);
  });
;}  

// a function to begin start up the drop down menu 
function startup (){
  var selectmenu = d3.select("#selDataset");
  // using the d3 json to fill the menu 
  d3.json(url).then((data) => {
    let menunames = data.names;
    menunames.forEach((id) => {
      selectmenu.append("option").text(id).property("value",id);
  });
  // making a varabile to call on the functions helped from ASKBSC
  let testvalue = menunames[0];
  // using it on the all the functions 
   infobbox(testvalue);
   samplebar(testvalue);
   samplebubble(testvalue);
  });
};
// to change the values and the resepect charts helped from ASKBSC
function optionChanged (changed){
  infobbox(changed);
  samplebar(changed);
  samplebubble(changed);
}

startup();
