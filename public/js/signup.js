$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var first_nameInput = $("input#first_name-input");
  var last_nameInput = $("input#last_name-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    console.log("working");
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      first_name: first_nameInput.val().trim(),
      last_name: last_nameInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.first_name,
      userData.last_name
    );
    emailInput.val("");
    passwordInput.val("");
    first_nameInput.val("");
    last_nameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, first_name, last_name) {
    $.post("/api/signup", {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    })
      .then(function(data) {
        window.location.href = "/members";
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
