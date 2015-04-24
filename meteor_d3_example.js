if (Meteor.isClient){
  
  Session.set("points", []);
  console.log("I'm running client code");
  
  function draw(svg, point){
     svg.append("circle")
        .attr("cx", point.x)
        .attr("cy", point.y)
        .attr("r", 2);
  }
  
  Template.clickSVG.onRendered(function(){
    // Once the svg is added to the DOM, register the event handler method
    // for the "click" event.
      var svgClick = d3.select("#clickArea");
      svgClick.on("click", getPosition);

      function getPosition(){
        var position = d3.mouse(this);
        var point = {"x": position[0], "y": position[1]};
        points = Session.get("points");
        points.push(point);
        Session.set("points", points);
        draw(svgClick, point)
      }
    
  });
  
  /* This function is a reactive context that will run whenever it
  senses changes in the Session (which is a reactive data source).
  */
  Tracker.autorun(function(){
    var length = Session.get("points").length;
    var svgChart = d3.select("#chartArea");
    if (length > 0) {
      var point = Session.get("points")[length-1];
      draw(svgChart, {"x": length*5, "y": point.y});
    }
    
  })
    
}
