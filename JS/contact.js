
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



























//get All value
let sendBtn = document.getElementById('send');
// let sestBtn = document.getElementById('reset');
let sestBtn = document.getElementById('form')


//Form Refresh state
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

//Now working For Reset Btn
// resetBtn.addEventListener('click', (e) => {
//   let name = document.getElementById('name');
//   let email = document.getElementById('email');
//   let message = document.getElementById('message');

//   //Set Value
//   name.value='';
//   email.value = '';
//   message.value =''
// });

//Now start SendBtn
sendBtn.addEventListener('click', (e) => {
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let message = document.getElementById('message');

  //Set Value and LocalStorage
  name = name.value;
  
  localStorage.setItem('name', name);

  email = email.value;
  localStorage.setItem('email', email);

  message = message.value;
  localStorage.setItem('message', message);
});