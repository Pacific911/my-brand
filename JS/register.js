let form = document.querySelector('#signup-form');
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    var user = {
        email:email,
        username:username,
        password:pass,
    };
    let users = [];
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if(!localStorage.getItem("users") ){
        users = [];
    }
    else{
        users = JSON.parse(localStorage.getItem("users"));
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert('Registered Successfully');
})



