

async function viewAllReservations(){
    let results;
    try{
     results = await db.reservations.findAll({
    include:[{model: db.users},{ model: db.users, as: 'instructor'}] })
     } catch (err) {
        console.log("Something went sideways",err);
      }

      let values = [];
      results.forEach(res => { 
        //   console.log(res);
        values.push({
      id:  res.id,
      start: res.start_Time,
      end: res.end_Time,
      instructor:res.instructor.first_name + ' '+ res.instructor.last_name,
      customer:res.user.first_name + ' '+ res.user.last_name,
      email: res.user.email,
      status: res.status,
      reservation_number: res.session_ID
     }); 
      });
      
    return values;
};