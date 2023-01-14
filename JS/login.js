function loginFunc(e){
    event.preventDefault();

    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    var username= /^[a-zA-Z0-9]+$/;

    if (username.length < 5) {
        errMsgHolder.innerHTML =
            'Please enter a name with at least 5 letters';
        return false;
    } else if (!(/^\S{3,}$/.test(username))) {
        errMsgHolder.innerHTML =
            'Name cannot contain whitespace';
        return false;
    }else if(!(/^[a-zA-Z]+$/.test(username)))
    

    var users = JSON.parse(localStorage.getItem("users"));
    const user = users.filter(user => user.username===username && user.password === pass)

    if(user){
        location.replace("index.html")
    }
    else{
        console.log("invalid credentilas")
    }
        

}

















// let loginform = document.querySelector('#login-form');
// console.log(loginform);
// loginform.addEventListener('submit', (e) =>{
//     var username = document.getElementById('username').value;
//     var pass = document.getElementById('password').value;

//     var users = JSON.parse(localStorage.getItem("users"));
//     const user = users.filter(user => user.username===username && user.password === pass)
//     // console.log(users)
//     if(user){
//          location.replace("index.html")
//     }
//     else{
//         console.log("invalid credentilas")
//     }

// })
