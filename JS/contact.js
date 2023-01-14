var form = document
  .getElementById("contact-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    var fullName = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var submitMessage = document.getElementById("errors-success");

    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/   
    
    if (!fullName || !email || !message) {

      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Fill all fields! </p> </div>';
    }
 
    else if (!email.match(regex)) {

      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Invalid email! </p> </div>';
    } else {

      var uniqueId = Date.now().toString();
      var newMessage = {
        id: uniqueId,
        fullName: fullName,
        email: email,
        message: message,
      };


      if (localStorage.getItem("messages") == null) {
        var messages = [];
        messages.push(newMessage);
        localStorage.setItem("messages", JSON.stringify(messages));
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Message sent! </p> </div>';

        console.log(JSON.parse(localStorage.getItem("messages")));
        clearForm();
      } else {

        var messages = JSON.parse(localStorage.getItem("messages"));

        messages.push(newMessage);
        localStorage.setItem("messages", JSON.stringify(messages));
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Message sent! </p> </div>';

        console.log(JSON.parse(localStorage.getItem("messages")));
        clearForm();
      }
    }

  });












































// function SendEmail(){
//   Email.send({
//     Host : "smtp.gmail.com",
//     Username : "nduwumwepacific@gmail.com",
//     Password : "simba911",
//     To : 'nduwumwepacific@gmail.com',
//     From : document.getElementById("email").value,
//     Subject : document.getElementById("subject").value,
//     Body : "Name:" + document.getElementById("name").value
//     +"<br> Email: "+ document.getElementById("email").value
//     +"<br> Subject: "+ document.getElementById("subject").value
//     +"<br> Message: "+ document.getElementById("message").value
// }).then(
//   _message => alert("Message send successfully")
// );
  
// }







// var btn = document.getElementById('btn');
// btn.addEventListener('click', function(e) {
//   e.preventDefault()

//   var name = document.getElementById('name').value;
//   var email = document.getElementById('email').value;
//   var subject = document.getElementById('subject').value;
//   var message = document.getElementById('message').value;
//   var body = 'name:' + name + '<br/> email:' + email + '<br/> subject' + subject + '<br/> message' + message;
  
//   Email.send({
//     Host : "smtp.gmail.com",
//     Username : "nduwumwepacific@gmail.com",
//     Password : "oqvuqchvluskzohx",
//     To : 'nduwumwepacific@gmail.com',
//     From : email,
//     Subject : subject,
//     Body : body
// }).then(
//   message => alert(message)
// );
// })



























// //get All value
// let sendBtn = document.getElementById('send');
// // let sestBtn = document.getElementById('reset');
// let sestBtn = document.getElementById('form')


// //Form Refresh state
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
// });

// //Now working For Reset Btn
// // resetBtn.addEventListener('click', (e) => {
// //   let name = document.getElementById('name');
// //   let email = document.getElementById('email');
// //   let message = document.getElementById('message');

// //   //Set Value
// //   name.value='';
// //   email.value = '';
// //   message.value =''
// // });

// //Now start SendBtn
// sendBtn.addEventListener('click', (e) => {
//   let name = document.getElementById('name');
//   let email = document.getElementById('email');
//   let message = document.getElementById('message');

//   //Set Value and LocalStorage
//   name = name.value;
  
//   localStorage.setItem('name', name);

//   email = email.value;
//   localStorage.setItem('email', email);

//   message = message.value;
//   localStorage.setItem('message', message);
// });