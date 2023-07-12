$(document).ready(function() {

    var currentDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(currentDay);

    var businessHours = [
      "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"
    ];
  
    var timeblocksContainer = $(".timeblocks");
    for (var i = 0; i < businessHours.length; i++) {
      var timeblock = $("<div>").addClass("row timeblock");
      var hourCol = $("<div>").addClass("col-2 hour").text(businessHours[i]);
      var eventCol = $("<textarea>").addClass("col-8 event");
  
      var currentHour = moment().hour();
      var timeblockHour = moment(businessHours[i], "hA").hour();
  
      if (timeblockHour < currentHour) {
        eventCol.addClass("past");
      } else if (timeblockHour === currentHour) {
        eventCol.addClass("present");
      } else {
        eventCol.addClass("future");
      }
  
      var saveBtn = $("<button>").addClass("col-2 saveBtn").html("<i class='fas fa-save'></i>");
  
      var savedEvent = localStorage.getItem(businessHours[i]);
      if (savedEvent) {
        eventCol.val(savedEvent);
      }
  
      timeblock.append(hourCol, eventCol, saveBtn);
      timeblocksContainer.append(timeblock);
    }
  
    $(".saveBtn").on("click", function() {
      var eventText = $(this).siblings(".event").val();
      var timeblockHour = $(this).siblings(".hour").text();
      localStorage.setItem(timeblockHour, eventText);
    });
  });