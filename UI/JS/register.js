let form = document.querySelector('#signup-form');
// let users = JSON.parse(localStorage.getItem("users")) ?? [];
// function storedData(currentUser) {
//   users.push(currentUser);
//   localStorage.setItem('users', JSON.stringify(users));
//   alert('Registered Successfully');
//   window.location.reload();
// }

var Button = document.querySelector('#btn-submit');

Button.addEventListener('click', async (e) => {
  e.preventDefault();

  var email = document.getElementById('email').value;
  var name = document.getElementById('name').value;
  var pass = document.getElementById('password').value;
  var error = document.getElementById('error');

  if (email && name && pass) {
    console.log('correct');
    const res = await fetch(
      'https://my-brand-production-bf0a.up.railway.app/user/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({ email, name, password }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const data = await res.json();
    console.log(res);

    
    // if (!ValidateEmail(email)) {
    //   // console.log('invalid email');
    //   error.textContent = '';
    //   error.textContent = 'Invalid email';
    // } else {
    //   error.textContent = '';
    //   var user = {
    //     email: email,
    //     username: username,
    //     password: pass,
    //   };
    //   console.log(user);
    //   storedData(user);
    // }
  } else {
    // error.textContent ='';

    error.textContent = 'Fill all the fields';
    console.log(error.textContent);
    console.log('correct data');
  }
});

function ValidateEmail(mail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}
