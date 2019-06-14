  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBy0bQlfpZ_dRpZy8cycPDxIg5-qJUsb5w",
    authDomain: "train-scheduler-3fa1b.firebaseapp.com",
    databaseURL: "https://train-scheduler-3fa1b.firebaseio.com",
    projectId: "train-scheduler-3fa1b",
    storageBucket: "train-scheduler-3fa1b.appspot.com",
    messagingSenderId: "804165967334",
    appId: "1:804165967334:web:1ce254093e081097"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Making a reference to the database service
var database = firebase.database();


$("#submit").on("click", function(event) {
    // Prevent the site from refreshing upon clicking submit or hitting enter
    event.preventDefault();

    // Variables to store form input field's data
    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#train-time").val().trim();
    var frequency = $("#frequency").val().trim();

    // Pushing these inputs to Firebase, each new form submission as an object
    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    });

    // Alert to use that train was added successfully
    alert("New train successfully added to scheduler!");

    // Clear input all fields each time submit is clicked or enter is hit
    $("input").val("");

});


database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();

    console.log(sv);

    var trainFrequency = (sv.frequency);
    var firstTime = (sv.time);

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "days");
    var currentTime = moment().subtract(1, "days");
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    var trainRemainder = diffTime % trainFrequency;
    var minutesTilTrain = trainFrequency - trainRemainder;
    var nextTrain = currentTime.add(minutesTilTrain, "minutes").format("HH:mm");


    var newName = $("<td>").text(sv.name);
    var newDestination = $("<td>").text(sv.destination);
    var newFrequency = $("<td>").text(sv.frequency);
    var nextArrival = $("<td>").text(nextTrain);
    var minutesAway = $("<td>").text(minutesTilTrain);

    var newRow = $("<tr>");
    newRow.addClass("table-light");
    
    newRow.append(newName, newDestination, newFrequency, nextArrival, minutesAway);
    
    $(".train-table-body").append(newRow);

}, function(errorObj) {
    // Create Error Handling
    console.log(errorObj.code);

});




