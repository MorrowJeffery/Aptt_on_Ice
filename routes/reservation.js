var db = require("../models");
var passport = require("../config/passport");
const { v4: uuidv4 } = require("uuid");

// let req = {
//   resStart_Time:
//   resEnd_Time:
//   Start_Time: "2020-04-12 2:30",
//   End_Time: "2020-04-12 3:00",
//   UserId: 4,
//   instructorID = 1,
//   session_ID = 'ef4b99ae-dc09-4633-a7f1-b92feb993c8b'
// };

async function createTimeSlot(db, start, end, Id) {
  let sesh_id = uuidv4();
  db.reservations.create({
    start_Time: start,
    end_Time: end,
    instructorId: Id,
    session_ID: sesh_id
  });
}
async function updateTimeSlot(db, start, end, session, stat, user) {
  db.reservations.update(
    {
      start_Time: start,
      end_Time: end,
      status: stat,
      userID: user
    },
    { where: { session_ID: session } }
  );
}

async function createReservation(db, req) {
  let {
    Start_Time,
    End_Time,
    userId,
    instructorID,
    session_ID,
    resStart_Time,
    resEnd_Time
  } = req.body;
  stat = "Booked";
  // entire time slot
  if (resStart_Time === Start_Time && req.resEnd_Time === End_Time) {
    updateTimeSlot(db, Start_Time, End_Time, session_ID, stat, userId);
  } else if (resStart_Time === Start_Time && resEnd_Time !== End_Time) {
    //   same start different end
    createTimeSlot(db, resEnd_Time, End_Time, instructorID);
    updateTimeSlot(db, Start_Time, resEnd_Time, session_ID, stat, userId);
  } else if (resStart_Time !== Start_Time && resEnd_Time === End_Time) {
    //   same end different start
    createTimeSlot(db, start_Time, resStart_Time, instructorID);
    updateTimeSlot(db, resStart_Time, End_Time, session_ID, stat, userId);
  } else {
    // different start and end
    createTimeSlot(db, start_Time, resStart_Time, instructorID);
    createTimeSlot(db, resEnd_Time, End_Time, instructorID);
    updateTimeSlot(db, resStart_Time, resEnd_Time, session_ID, stat, userId);
  }
}
