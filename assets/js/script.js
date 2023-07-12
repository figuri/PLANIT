$(document).ready(function() {

    var currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay);
// the var currentDay is assigned to the current day and time and the .text jquery method is used to display the current day and time in the currentDay id
    var businessHours = [
      "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"
    ];
//   the above array is assigned to the variable businessHours
    var timeblocksContainer = $(".timeblocks");
    for (var i = 0; i < businessHours.length; i++) {
      var timeblock = $("<div>").addClass("row timeblock");
      var hourCol = $("<div>").addClass("col-2 hour").text(businessHours[i]);
      var eventCol = $("<textarea>").addClass("col-8 event");
  
      var currentHour = moment().hour();
      var timeblockHour = moment(businessHours[i], "hA").hour();
//   the above variables are assigned to the current hour and the timeblock hour
      if (timeblockHour < currentHour) {
        eventCol.addClass("past");
      } else if (timeblockHour === currentHour) {
        eventCol.addClass("present");
      } else {
        eventCol.addClass("future");
      }
//   the above if else statement is used to assign the past, present, and future classes to the timeblocks
      var saveBtn = $("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>").text("Save");
  
      var savedEvent = localStorage.getItem(businessHours[i]);
      if (savedEvent) {
        eventCol.val(savedEvent);
      }
//   the above if statement is used to save the events to local storage
      timeblock.append(hourCol, eventCol, saveBtn);
      timeblocksContainer.append(timeblock);
    }
//   the above for loop is used to append the timeblocks to the timeblocks container
    $(".saveBtn").on("click", function() {
      var eventText = $(this).siblings(".event").val();
      var timeblockHour = $(this).siblings(".hour").text();
      localStorage.setItem(timeblockHour, eventText);
    });
  });