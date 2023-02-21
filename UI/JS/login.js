async function loginFunc(event) {
  event.preventDefault();

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  var error = document.getElementById('error');

  if (username && pass) {
    const res = await fetch(
      'https://my-brand-production-bf0a.up.railway.app/user/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
      },
    );
    const data = await res.json();
    console.log(data);
    if (data.code == 200) {
    } else {
      /*----send error to the input field ---*/
      console.log(data.message);
      error.innerHTML = `<p>${data.message}</p>`;
    }

    // const userIndex = b.findIndex(usr=> usr.username == username)
    // if(userIndex != -1){
    //     if(username == 'admin'){
    //         if(pass == 'pacific'){

    //             localStorage.setItem("Active",JSON.stringify([{activeuser:b[userIndex].username}]))

    //             window.location.href ='../dashboards/Dashboard.html';
    //         } else if( b[userIndex].password == pass){

    //             localStorage.setItem("Active",JSON.stringify([{activeuser:b[userIndex].username}]))

    //             window.location.href ='../index.html';
    //         }else{
    //             error.textContent='incorrect password';
    //         }
    //     }else{
    //         if( b[userIndex].password == pass){

    //             localStorage.setItem("Active",JSON.stringify([{activeuser:b[userIndex].username}]))

    //             window.location.href='../index.html';
    //         }else{
    //             error.textContent='incorrect password';
    //         }
    //     }
    // }else{
    //     error.textContent='user does not exist';
    // }
  } else {
    error.textContent = 'fill all the fields';
  }
}
