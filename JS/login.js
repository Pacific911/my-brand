let a = localStorage.getItem('users');
const b = JSON.parse(a);
function loginFunc(event){
    event.preventDefault();

    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;

    var error = document.getElementById('error');

    if(username && pass){
        const userIndex = b.findIndex(usr=> usr.username == username)
        if(userIndex != -1){
            if(username == 'admin'){
                if(pass == 'pacific'){

                    localStorage.setItem("Active",JSON.stringify([{activeuser:b[userIndex].username}]))

                    window.location.href ='../dashboards/Dashboard.html';
                } else if( b[userIndex].password == pass){

                    localStorage.setItem("Active",JSON.stringify([{activeuser:b[userIndex].username}]))

                    window.location.href ='../index.html';
                }else{
                    error.textContent='incorrect password';
                }
            }else{
                if( b[userIndex].password == pass){

                    localStorage.setItem("Active",JSON.stringify([{activeuser:b[userIndex].username}]))

                    window.location.href='../index.html';
                }else{
                    error.textContent='incorrect password';
                }
            }
        }else{
            error.textContent='user does not exist';
        }
        
    }else{
        error.textContent='fill all the fields';
    }

    

    var users = JSON.parse(localStorage.getItem("users"));
    const user = users.filter(user => user.username===username && user.password === pass)

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
