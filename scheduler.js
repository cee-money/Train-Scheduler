var firebaseConfig = {
    apiKey: "AIzaSyBy0bQlfpZ_dRpZy8cycPDxIg5-qJUsb5w",
    authDomain: "train-scheduler-3fa1b.firebaseapp.com",
    databaseURL: "https://train-scheduler-3fa1b.firebaseio.com",
    projectId: "train-scheduler-3fa1b",
    storageBucket: "",
    messagingSenderId: "804165967334",
    appId: "1:804165967334:web:1ce254093e081097"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Making a reference to the database service
var database = firebase.database();


$("#submit").on("click", function(event) {
    event.preventDefault();

    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#train-time").val().trim();
    var frequency = $("#frequency").val().trim();

    var newRow = $("<tr>");
    newRow.addClass("table-light");

    var newName = $("<td>" + name + "</td>");
    var newDestination = $("<td>" + destination + "</td>");
    var newTime = $("<td>" + time + "</td>");
    var newFrequency = $("<td>" + frequency + "</td>");

    $(".train-table-body").append(newRow);
    newRow.append(newName);
    newRow.append(newDestination);
    newRow.append(newTime);
    newRow.append(newFrequency);

    var newInput = { 
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    };

    database.ref().set(newInput);

    name.val("");
    destination.val("");
    time.val("");
    frequency.val("");

});




