var config = {
  apiKey: "AIzaSyDQVWMKgmGYa9cCeekH28R7oLAcGeDgLJU",
  authDomain: "trainhw-bb1f3.firebaseapp.com",
  databaseURL: "https://trainhw-bb1f3.firebaseio.com",
  projectId: "trainhw",
  storageBucket: "trainhw.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var inTrain = $("train-name-input").val().trim();
  var inDestination = $("destination-input").val().trim();
  var inFreq = $("freq-input").val().trim();
  var inArr = moment($("time-input").val().trim(), "hh:mm").subtract(1, "years").format("X");

  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("hh:mm"));

  var newTrain = {
    name: inTrain,
    destination: inDestination,
    arrival: inArr,
    frequency: inFreq
  };

  database.ref().push(inTrain);

  console.log(inTrain.name);
  console.log(inDestination.destination);
  console.log(inArr.arrival);
  console.log(inFreq.frequency);

  alert("Funk added!");

  $("train-name-input").val("");
  $("destination-input").val("");
  $("freq-input").val("");
  $("time-input").val("");


});



database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  var inTrain = childSnapshot.val().name;
  var inDestination = childSnapshot.val().destination;
  var inArr = childSnapshot.val().arrival;
  var inFreq = childSnapshot.val().frequency;

  console.log(inTrain);
  console.log(inDestination);
  console.log(inArr);
  console.log(inFreq);

  var inArrPretty = moment.unix(inArr).format("hh:mm");
   
  // Calculate
  var inMinutes = moment().diff(moment(inArr, "x"), "minutes");
  console.log(inMinutes);


  // Time calculated for predictions
  var inMinutes = inFreq - inArrPretty;

  var newarrival = moment().add(inMinutes, "minutes").format("hh:mm");
  console.log(newarrival);

  //new row 
  var newRow = $("<tr>").append(
    $("<td>").text(inTrain),
    $("<td>").text(inDestination),
    $("<td>").text(inFreq),
    $("<td>").text(newarrival),
    $("<td>").text(inMinutes)
  );

  //Append new row to table
  $("train-table > tbody").append(newRow);

  


});

