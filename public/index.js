document.addEventListener("DOMContentLoaded", function () {
  var tellerConnect = TellerConnect.setup({
    //   environment: "development"
    applicationId: "APPLICATION_ID",
    onInit: function () {
      console.log("Teller Connect has initialized");
    },
    
    onSuccess: function (enrollment) {
      console.log("User enrolled successfully", enrollment.accessToken);
      console.log("Enrollment ID", enrollment.enrollment.id, enrollment.enrollment);
      postCredentials(enrollment.accessToken, enrollment.enrollment);
    },
    onExit: function () {
      console.log("User closed Teller Connect");
    },
  });

  
  var el = document.getElementById("teller-connect");
  el.addEventListener("click", function () {
    tellerConnect.open();
  });
});

function postCredentials(accessToken, enrollment_id) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
      "token": accessToken,
      "enrollmentId": enrollment_id
  });

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };

  fetch("/api/v1/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}