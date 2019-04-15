var config = {
  apiKey: "AIzaSyDQVWMKgmGYa9cCeekH28R7oLAcGeDgLJU",
  authDomain: "trainhw-bb1f3.firebaseapp.com",
  databaseURL: "https://trainhw-bb1f3.firebaseio.com",
  projectId: "trainhw",
  storageBucket: "trainhw.appspot.co  m",
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  
  
  var inTrain = $("#train-name-input").val();
  var inDestination = $("#destination-input").val();
  var inFreq = $("#freq-input").val();
  var inArr = moment($("#time-input").val(), "hh:mm").format("hh:mm");

  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("hh:mm"));

  var newTrain = {
    name: inTrain,
    destination: inDestination,
    arrival: inArr,
    frequency: inFreq
  };

  database.ref().push(newTrain);

  console.log(inTrain);
  console.log(inDestination);
  console.log(inArr);
  console.log(inFreq);

  alert("Funk added!");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#freq-input").val("");
  $("#time-input").val("");


});



database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var inTrain = childSnapshot.val().name;
  var inDestination = childSnapshot.val().destination;
  var inArr = childSnapshot.val().arrival;
  var inFreq = childSnapshot.val().frequency;

  console.log(inTrain);
  console.log(inDestination);
  console.log(inArr);
  console.log(inFreq);

  // Calcuations based from train-example.html

  
  // First time
  var firsttimeconv = moment(inArr, "hh:mm").subtract(1, "years");
  console.log(firsttimeconv);
  
  // Current time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Time difference
  var difftime = moment().diff(moment(firsttimeconv), "minutes");
  console.log("DIFFERENCE IN TIME: " + difftime);
  
  //Time apart
  var tremainder = difftime % inFreq;
  console.log(tremainder);

  // Minutes till arrival
  var tminutestrain = inFreq - tremainder;
  console.log("MINUTES TILL TRAIN: " + tminutestrain);

  // Next train arrival
  var nexttrain = moment().add(tminutestrain, "minutes").format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nexttrain).format("hh:mm"));
  
  //new rows for appending results
  var newRow = $("<tr>").append(
    $("<td>").text(inTrain),
    $("<td>").text(inDestination),
    $("<td>").text(inFreq),
    $("<td>").text(nexttrain),
    $("<td>").text(tminutestrain)
  );





  //Append new row to table
  $("#train-table").append(newRow);

  


});

