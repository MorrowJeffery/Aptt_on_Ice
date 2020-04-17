(function() {
  // Schedule Template - by CodyHouse.com
  function ScheduleTemplate(element) {
    this.element = element;
    this.timelineItems = this.element
      .getElementsByClassName("cd-schedule__timeline")[0]
      .getElementsByTagName("li");
    this.timelineStart = getScheduleTimestamp(
      this.timelineItems[0].textContent
    );
    this.timelineUnitDuration =
      getScheduleTimestamp(this.timelineItems[1].textContent) -
      getScheduleTimestamp(this.timelineItems[0].textContent);

    this.topInfoElement = this.element.getElementsByClassName(
      "cd-schedule__top-info"
    )[0];
    this.singleEvents = this.element.getElementsByClassName(
      "cd-schedule__event"
    );

    this.modal = this.element.getElementsByClassName("cd-schedule-modal")[0];
    this.modalHeader = this.element.getElementsByClassName(
      "cd-schedule-modal__header"
    )[0];
    this.modalHeaderBg = this.element.getElementsByClassName(
      "cd-schedule-modal__header-bg"
    )[0];
    this.modalBody = this.element.getElementsByClassName(
      "cd-schedule-modal__body"
    )[0];
    this.modalBodyBg = this.element.getElementsByClassName(
      "cd-schedule-modal__body-bg"
    )[0];
    this.modalClose = this.modal.getElementsByClassName(
      "cd-schedule-modal__close"
    )[0];
    this.modalDate = this.modal.getElementsByClassName(
      "cd-schedule-modal__date"
    )[0];
    this.modalEventName = this.modal.getElementsByClassName(
      "cd-schedule-modal__name"
    )[0];
    this.coverLayer = this.element.getElementsByClassName(
      "cd-schedule__cover-layer"
    )[0];

    this.modalMaxWidth = 800;
    this.modalMaxHeight = 480;

    this.animating = false;
    this.supportAnimation = Util.cssSupports("transition");

    this.initSchedule();
  }

  ScheduleTemplate.prototype.initSchedule = function() {
    this.scheduleReset();
    this.initEvents();
  };

  ScheduleTemplate.prototype.scheduleReset = function() {
    // according to the mq value, init the style of the template
    var mq = this.mq(),
      loaded = Util.hasClass(this.element, "js-schedule-loaded"),
      modalOpen = Util.hasClass(this.modal, "cd-schedule-modal--open");
    if (mq == "desktop" && !loaded) {
      Util.addClass(this.element, "js-schedule-loaded");
      this.placeEvents();
      //modalOpen && this.checkEventModal(modalOpen);
    } else if (mq == "mobile" && loaded) {
      //in this case you are on a mobile version (first load or resize from desktop)
      Util.removeClass(this.element, "cd-schedule--loading js-schedule-loaded");
      this.resetEventsStyle();
      modalOpen && this.checkEventModal();
    } else if (mq == "desktop" && modalOpen) {
      //on a mobile version with modal open - need to resize/move modal window
      this.checkEventModal(modalOpen);
      Util.removeClass(this.element, "cd-schedule--loading");
    } else {
      Util.removeClass(this.element, "cd-schedule--loading");
    }
  };

  ScheduleTemplate.prototype.resetEventsStyle = function() {
    // remove js style applied to the single events
    for (var i = 0; i < this.singleEvents.length; i++) {
      this.singleEvents[i].removeAttribute("style");
    }
  };

  ScheduleTemplate.prototype.placeEvents = function() {
    // on big devices - place events in the template according to their time/day
    var self = this,
      slotHeight = this.topInfoElement.offsetHeight;
    for (var i = 0; i < this.singleEvents.length; i++) {
      var anchor = this.singleEvents[i].getElementsByTagName("a")[0];
      var start = getScheduleTimestamp(anchor.getAttribute("data-start")),
        duration =
          getScheduleTimestamp(anchor.getAttribute("data-end")) - start;

      var eventTop =
          (slotHeight * (start - self.timelineStart)) /
          self.timelineUnitDuration,
        eventHeight = (slotHeight * duration) / self.timelineUnitDuration;

      this.singleEvents[i].setAttribute(
        "style",
        "top: " + (eventTop - 1) + "px; height: " + (eventHeight + 1) + "px"
      );
    }

    Util.removeClass(this.element, "cd-schedule--loading");
  };

  ScheduleTemplate.prototype.initEvents = function() {
    var self = this;
    // for(var i = 0; i < this.singleEvents.length; i++) {
    // 	// open modal when user selects an event
    // 	this.singleEvents[i].addEventListener('click', function(event){
    // 		event.preventDefault();
    // 		if(!self.animating) self.openModal(this.getElementsByTagName('a')[0]);
    // 	});
    // }
    //close modal window
    this.modalClose.addEventListener("click", function(event) {
      event.preventDefault();
      if (!self.animating) self.closeModal();
    });
    this.coverLayer.addEventListener("click", function(event) {
      event.preventDefault();
      if (!self.animating) self.closeModal();
    });
  };

  ScheduleTemplate.prototype.openModal = function(target) {
    var self = this;
    var mq = self.mq();
    this.animating = true;

    //update event name and time
    this.modalEventName.textContent = target.getElementsByTagName(
      "em"
    )[0].textContent;
    this.modalDate.textContent =
      target.getAttribute("data-start") +
      " - " +
      target.getAttribute("data-end");
    this.modal.setAttribute("data-event", target.getAttribute("data-event"));

    //update event content
    this.loadEventContent(target.getAttribute("data-content"));

    Util.addClass(this.modal, "cd-schedule-modal--open");

    setTimeout(function() {
      //fixes a flash when an event is selected - desktop version only
      Util.addClass(target.closest("li"), "cd-schedule__event--selected");
    }, 10);

    if (mq == "mobile") {
      self.modal.addEventListener("transitionend", function cb() {
        self.animating = false;
        self.modal.removeEventListener("transitionend", cb);
      });
    } else {
      var eventPosition = target.getBoundingClientRect(),
        eventTop = eventPosition.top,
        eventLeft = eventPosition.left,
        eventHeight = target.offsetHeight,
        eventWidth = target.offsetWidth;

      var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;

      var modalWidth =
          windowWidth * 0.8 > self.modalMaxWidth
            ? self.modalMaxWidth
            : windowWidth * 0.8,
        modalHeight =
          windowHeight * 0.8 > self.modalMaxHeight
            ? self.modalMaxHeight
            : windowHeight * 0.8;

      var modalTranslateX = parseInt(
          (windowWidth - modalWidth) / 2 - eventLeft
        ),
        modalTranslateY = parseInt((windowHeight - modalHeight) / 2 - eventTop);

      var HeaderBgScaleY = modalHeight / eventHeight,
        BodyBgScaleX = modalWidth - eventWidth;

      //change modal height/width and translate it
      self.modal.setAttribute(
        "style",
        "top:" +
          eventTop +
          "px;left:" +
          eventLeft +
          "px;height:" +
          modalHeight +
          "px;width:" +
          modalWidth +
          "px;transform: translateY(" +
          modalTranslateY +
          "px) translateX(" +
          modalTranslateX +
          "px)"
      );
      //set modalHeader width
      self.modalHeader.setAttribute("style", "width:" + eventWidth + "px");
      //set modalBody left margin
      self.modalBody.setAttribute("style", "margin-left:" + eventWidth + "px");
      //change modalBodyBg height/width ans scale it
      self.modalBodyBg.setAttribute(
        "style",
        "height:" +
          eventHeight +
          "px; width: 1px; transform: scaleY(" +
          HeaderBgScaleY +
          ") scaleX(" +
          BodyBgScaleX +
          ")"
      );
      //change modal modalHeaderBg height/width and scale it
      self.modalHeaderBg.setAttribute(
        "style",
        "height: " +
          eventHeight +
          "px; width: " +
          eventWidth +
          "px; transform: scaleY(" +
          HeaderBgScaleY +
          ")"
      );

      self.modalHeaderBg.addEventListener("transitionend", function cb() {
        //wait for the  end of the modalHeaderBg transformation and show the modal content
        self.animating = false;
        Util.addClass(self.modal, "cd-schedule-modal--animation-completed");
        self.modalHeaderBg.removeEventListener("transitionend", cb);
      });
    }

    //if browser do not support transitions -> no need to wait for the end of it
    this.animationFallback();
  };

  ScheduleTemplate.prototype.closeModal = function() {
    var self = this;
    var mq = self.mq();

    var item = self.element.getElementsByClassName(
        "cd-schedule__event--selected"
      )[0],
      target = item.getElementsByTagName("a")[0];

    this.animating = true;

    if (mq == "mobile") {
      Util.removeClass(this.modal, "cd-schedule-modal--open");
      self.modal.addEventListener("transitionend", function cb() {
        Util.removeClass(self.modal, "cd-schedule-modal--content-loaded");
        Util.removeClass(item, "cd-schedule__event--selected");
        self.animating = false;
        self.modal.removeEventListener("transitionend", cb);
      });
    } else {
      var eventPosition = target.getBoundingClientRect(),
        eventTop = eventPosition.top,
        eventLeft = eventPosition.left,
        eventHeight = target.offsetHeight,
        eventWidth = target.offsetWidth;

      var modalStyle = window.getComputedStyle(self.modal),
        modalTop = Number(modalStyle.getPropertyValue("top").replace("px", "")),
        modalLeft = Number(
          modalStyle.getPropertyValue("left").replace("px", "")
        );

      var modalTranslateX = eventLeft - modalLeft,
        modalTranslateY = eventTop - modalTop;

      Util.removeClass(
        this.modal,
        "cd-schedule-modal--open cd-schedule-modal--animation-completed"
      );

      //change modal width/height and translate it
      self.modal.style.width = eventWidth + "px";
      self.modal.style.height = eventHeight + "px";
      self.modal.style.transform =
        "translateX(" +
        modalTranslateX +
        "px) translateY(" +
        modalTranslateY +
        "px)";
      //scale down modalBodyBg element
      self.modalBodyBg.style.transform = "scaleX(0) scaleY(1)";
      //scale down modalHeaderBg element
      // self.modalHeaderBg.setAttribute('style', 'transform: scaleY(1)');
      self.modalHeaderBg.style.transform = "scaleY(1)";

      self.modalHeaderBg.addEventListener("transitionend", function cb() {
        //wait for the  end of the modalHeaderBg transformation and reset modal style
        Util.addClass(self.modal, "cd-schedule-modal--no-transition");
        setTimeout(function() {
          self.modal.removeAttribute("style");
          self.modalBody.removeAttribute("style");
          self.modalHeader.removeAttribute("style");
          self.modalHeaderBg.removeAttribute("style");
          self.modalBodyBg.removeAttribute("style");
        }, 10);
        setTimeout(function() {
          Util.removeClass(self.modal, "cd-schedule-modal--no-transition");
        }, 20);
        self.animating = false;
        Util.removeClass(self.modal, "cd-schedule-modal--content-loaded");
        Util.removeClass(item, "cd-schedule__event--selected");
        self.modalHeaderBg.removeEventListener("transitionend", cb);
      });
    }

    //if browser do not support transitions -> no need to wait for the end of it
    this.animationFallback();
  };

  ScheduleTemplate.prototype.checkEventModal = function(modalOpen) {
    // this function is used on resize to reset events/modal style
    this.animating = true;
    var self = this;
    var mq = this.mq();
    if (mq == "mobile") {
      //reset modal style on mobile
      self.modal.removeAttribute("style");
      self.modalBody.removeAttribute("style");
      self.modalHeader.removeAttribute("style");
      self.modalHeaderBg.removeAttribute("style");
      self.modalBodyBg.removeAttribute("style");
      Util.removeClass(self.modal, "cd-schedule-modal--no-transition");
      self.animating = false;
    } else if (mq == "desktop" && modalOpen) {
      Util.addClass(
        self.modal,
        "cd-schedule-modal--no-transition cd-schedule-modal--animation-completed"
      );
      var item = self.element.getElementsByClassName(
          "cd-schedule__event--selected"
        )[0],
        target = item.getElementsByTagName("a")[0];

      var eventPosition = target.getBoundingClientRect(),
        eventTop = eventPosition.top,
        eventLeft = eventPosition.left,
        eventHeight = target.offsetHeight,
        eventWidth = target.offsetWidth;

      var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;

      var modalWidth =
          windowWidth * 0.8 > self.modalMaxWidth
            ? self.modalMaxWidth
            : windowWidth * 0.8,
        modalHeight =
          windowHeight * 0.8 > self.modalMaxHeight
            ? self.modalMaxHeight
            : windowHeight * 0.8;

      var HeaderBgScaleY = modalHeight / eventHeight,
        BodyBgScaleX = modalWidth - eventWidth;

      setTimeout(function() {
        self.modal.setAttribute(
          "style",
          "top:" +
            (windowHeight / 2 - modalHeight / 2) +
            "px;left:" +
            (windowWidth / 2 - modalWidth / 2) +
            "px;height:" +
            modalHeight +
            "px;width:" +
            modalWidth +
            "px;transform: translateY(0) translateX(0)"
        );
        //change modal modalBodyBg height/width
        self.modalBodyBg.style.height = modalHeight + "px";
        self.modalBodyBg.style.transform =
          "scaleY(1) scaleX(" + BodyBgScaleX + ")";
        self.modalBodyBg.style.width = "1px";
        //set modalHeader width
        self.modalHeader.setAttribute("style", "width:" + eventWidth + "px");
        //set modalBody left margin
        self.modalBody.setAttribute(
          "style",
          "margin-left:" + eventWidth + "px"
        );
        //change modal modalHeaderBg height/width and scale it
        self.modalHeaderBg.setAttribute(
          "style",
          "height: " +
            eventHeight +
            "px;width:" +
            eventWidth +
            "px; transform:scaleY(" +
            HeaderBgScaleY +
            ");"
        );
      }, 10);

      setTimeout(function() {
        Util.removeClass(self.modal, "cd-schedule-modal--no-transition");
        self.animating = false;
      }, 20);
    }
  };

  ScheduleTemplate.prototype.loadEventContent = function(content) {
    // load the content of an event when user selects it
    var self = this;

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          self.modal.getElementsByClassName(
            "cd-schedule-modal__event-info"
          )[0].innerHTML = self.getEventContent(httpRequest.responseText);
          Util.addClass(self.modal, "cd-schedule-modal--content-loaded");
        }
      }
    };
    httpRequest.open("GET", content + ".html");
    httpRequest.send();
  };

  ScheduleTemplate.prototype.animationFallback = function() {
    if (!this.supportAnimation) {
      // fallback for browsers not supporting transitions
      var event = new CustomEvent("transitionend");
      self.modal.dispatchEvent(event);
      self.modalHeaderBg.dispatchEvent(event);
    }
  };

  ScheduleTemplate.prototype.mq = function() {
    //get MQ value ('desktop' or 'mobile')
    var self = this;
    return window
      .getComputedStyle(this.element, "::before")
      .getPropertyValue("content")
      .replace(/'|"/g, "");
  };

  function getScheduleTimestamp(time) {
    //accepts hh:mm format - convert hh:mm to timestamp
    time = time.replace(/ /g, "");
    var timeArray = time.split(":");
    var timeStamp = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
    return timeStamp;
  }

  var scheduleTemplate = document.getElementsByClassName("js-cd-schedule"),
    scheduleTemplateArray = [],
    resizing = false;
  if (scheduleTemplate.length > 0) {
    // init ScheduleTemplate objects
    for (var i = 0; i < scheduleTemplate.length; i++) {
      (function(i) {
        scheduleTemplateArray.push(new ScheduleTemplate(scheduleTemplate[i]));
      })(i);
    }

    window.addEventListener("resize", function(event) {
      // on resize - update events position and modal position (if open)
      if (!resizing) {
        resizing = true;
        !window.requestAnimationFrame
          ? setTimeout(checkResize, 250)
          : window.requestAnimationFrame(checkResize);
      }
    });

    window.addEventListener("keyup", function(event) {
      // close event modal when pressing escape key
      if (
        (event.keyCode && event.keyCode == 27) ||
        (event.key && event.key.toLowerCase() == "escape")
      ) {
        for (var i = 0; i < scheduleTemplateArray.length; i++) {
          scheduleTemplateArray[i].closeModal();
        }
      }
    });

    function checkResize() {
      for (var i = 0; i < scheduleTemplateArray.length; i++) {
        scheduleTemplateArray[i].scheduleReset();
      }
      resizing = false;
    }
  }
})();

//start dropdown code
let dropedDown = false;
let reservationDay = "";
let reservationZone = "";
let availibleStart = "";
let availibleEnd = "";
let userID = "";
let Instructor = "";
let session = "";

$.get("/api/user_data").then(function(data) {
  userID = data.id;
});

function genDropDowns() {
  const dropdown1 = $("<div>").addClass("dropdown");
  const dropdown2 = $("<div>").addClass("dropdown");
  const button1 = $("<button>")
    .addClass("btn btn-primary dropdown-toggle")
    .attr("type", "button")
    .attr("data-toggle", "dropdown")
    .attr("id", "LT")
    .text("Lesson Time");
  const button2 = $("<button>")
    .addClass("btn btn-primary dropdown-toggle")
    .attr("type", "button")
    .attr("data-toggle", "dropdown")
    .attr("id", "LOL")
    .text("Length Of Lesson");
  const span1 = $("<span>").addClass("caret");
  const span2 = $("<span>").addClass("caret");
  const ul1 = $("<ul>")
    .addClass("dropdown-menu")
    .attr("id", "startTimeList");
  const ul2 = $("<ul>").addClass("dropdown-menu");
  const a1 = $("<a>")
    .text("15")
    .addClass("times");
  const a2 = $("<a>")
    .text("30")
    .addClass("times");
  const a3 = $("<a>")
    .text("45")
    .addClass("times");
  const a4 = $("<a>")
    .text("60")
    .addClass("times");
  const li1 = $("<li>").append(a1);
  const li2 = $("<li>").append(a2);
  const li3 = $("<li>").append(a3);
  const li4 = $("<li>").append(a4);

  $("#dropdownholder").append(dropdown1);
  $("#dropdownholder").append(dropdown2);
  dropdown1.append(button1, span1, ul1);
  dropdown2.append(button2, span2, ul2);
  ul2.append(li1, li2, li3, li4);

  const subButton = $("<button>")
    .attr("id", "newReservationBtn")
    .attr("type", "button")
    .text("Submit");
  $("#dropdownholder").append(subButton);
}

function genTimeBlocks(start, end) {
  if (start.length == 5) {
    var starthour = start.slice(0, 2);
  } else {
    var starthour = start.slice(0, 1);
  }
  var startminutes = start.slice(-2);

  var hourTracker = parseInt(starthour);
  var minuteTracker = parseInt(startminutes);
  for (; time != end; minuteTracker += 15) {
    if (minuteTracker == 60) {
      minuteTracker = 0;
      hourTracker++;
    }
    if (minuteTracker == 0) {
      var time = hourTracker + ":" + "00";
    } else {
      var time = hourTracker + ":" + minuteTracker;
    }
    if (time == end) {
      break;
    }
    var timeli = $("<li>");
    var timea = $("<a>")
      .text(time)
      .addClass("timeslots");
    timeli.append(timea);
    $("#startTimeList").append($(timeli));
  }
}

function fixTime(fixme) {
  var year = fixme.slice(11, 15);
  var month = moment()
    .month(fixme.slice(4, 8))
    .format("M");
  if (month.length == 1) {
    month = "0" + month;
  }
  var day = fixme.slice(8, 10);
  var hour = fixme.slice(16, 18);
  var minute = fixme.slice(18, 21);
  var second = fixme.slice(21, 24);

  return (
    year + "-" + month + "-" + day + "T" + hour + minute + second + ".000Z"
  );
}

function genTimeBlocks(start, end) {
  console.log(start, end);
  if (start.length == 5) {
    var starthour = start.slice(0, 2);
    console.log(starthour);
  } else {
    var starthour = start.slice(0, 1);
  }
  var startminutes = start.slice(-2);
  console.log(startminutes);

  var hourTracker = parseInt(starthour);
  console.log(hourTracker);
  var minuteTracker = parseInt(startminutes);
  console.log(minuteTracker);
  for (; time != end; minuteTracker += 15) {
    if (minuteTracker == 60) {
      minuteTracker = 0;
      hourTracker++;
    }
    if (minuteTracker == 0) {
      var time = hourTracker < 10 ? `0${hourTracker}:00` : `${hourTracker}:00`;
    } else {
      var time =
        hourTracker < 10
          ? `0${hourTracker}:${minuteTracker}`
          : `${hourTracker}:${minuteTracker}`;
    }
    if (time == end) {
      break;
    }
    var timeli = $("<li>");
    var timea = $("<a>")
      .text(time)
      .addClass("timeslots");
    console.log("anything doesnt matter");
    timeli.append(timea);
    $("#startTimeList").append($(timeli));
  }
}

$(document).click(function() {
  if ($(event.target).attr("id") != "newReservationBtn") {
    return;
  }
  var Start_Time = fixTime(availibleStart);
  var End_Time = fixTime(availibleEnd);
  var userId = userID;
  var instructorID = Instructor;
  var session_ID = session;
  var unformatedstart = $("#LT").text();
  if (unformatedstart.length == 4) {
    var resStart_Time = "0" + unformatedstart;
  } else {
    var resStart_Time = unformatedstart;
  }
  var resEnd_Time = moment()
    .hour(resStart_Time.slice(0, 2))
    .minute(resStart_Time.slice(-2))
    .add($("#LOL").text(), "minutes")
    .format("HH:mm");
  var resStart_Time = reservationDay + resStart_Time + reservationZone;
  resStart_Time = fixTime(resStart_Time);
  resEnd_Time = reservationDay + resEnd_Time + reservationZone;
  resEnd_Time = fixTime(resEnd_Time);
  console.log(
    Start_Time,
    End_Time,
    userId,
    instructorID,
    session_ID,
    resStart_Time,
    resEnd_Time
  );
  $.post("/api/make-reservation", {
    Start_Time: Start_Time,
    End_Time: End_Time,
    userId: userId,
    instructorID: instructorID,
    session_ID: session_ID,
    resStart_Time: resStart_Time,
    resEnd_Time: resEnd_Time,
  });
});

$(document).ready(function() {
  $(".cd-schedule__event").on("click", function(event) {
    if (dropedDown == false) {
      genDropDowns();
      dropedDown = true;
    }
    $("#startTimeList").empty();
    $(document).ready(function() {
      genstart = $(event.target)
        .attr("data-start")
        .slice(16, 21);
      genend = $(event.target)
        .attr("data-end")
        .slice(16, 21);
      genTimeBlocks(genstart, genend);
    });

    availibleStart = $(event.target).attr("data-start");
    availibleEnd = $(event.target).attr("data-end");
    reservationDay = $(event.target)
      .attr("data-start")
      .slice(0, 16);
    reservationZone = $(event.target)
      .attr("data-start")
      .slice(21, 24);
    session = $(event.target)
      .attr("data-event")
      .slice(-1);
    Instructor = $(event.target).attr("data-content");
  });
  $(document).click(function(event) {
    if ((event.target.tagName = "A")) {
      if ($(event.target).attr("class") == "timeslots") {
        $("#LT").text($(event.target).text());
      }
      if ($(event.target).attr("class") == "times") {
        $("#LOL").text($(event.target).text());
      }
    }
  });
});

$(".dropdown-toggle").dropdown();
