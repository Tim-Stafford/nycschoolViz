let dataset = []

d3.csv("/data/d3Scatter.csv").then(function(data) { // Promise on load with then
  data.forEach(function(d) {
    d.performance = +d.performance;
  });
  //console.log(data[0]);
  dataset = data;
});
