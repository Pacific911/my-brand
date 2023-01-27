let form = document.querySelector('#signup-form');
let users = JSON.parse(localStorage.getItem("users")) ?? [];
function storedData(currentUser){

    users.push(currentUser)
    localStorage.setItem("users", JSON.stringify(users));
    alert('Registered Successfully');
    window.location.reload();

}

var Button = document.getElementById('btn-submit');

Button.addEventListener('click', (e) =>{
    e.preventDefault();

    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    var error = document.getElementById('error');

    if(email && username && pass){
        if(!ValidateEmail(email)){
            // console.log('invalid email');
        error.textContent ='';
        error.textContent = 'Invalid email';
        }else{
            error.textContent ='';
            var user = {
                email:email,
                username:username,
                password:pass,
        
            };
            console.log(user);
            storedData(user)
        }
    }else{
        // error.textContent ='';

        error.textContent = 'Fill all the fields';
        console.log(error.textContent);
    }

})


function ValidateEmail(mail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
}












    // const setError = ( element, message) => {
    //     const inputControl = element.parentElement;
    //     const errorDisplay = inputControl.querySelector('.error');

    //     errorDisplay.innerText = message;
    //     inputControl.classlist.add('error');
    //     inputControl.classlist.remove('success');
    // };

    // const setSuccess = ( element, message) => {
    //     const inputControl = element.parentElement;
    //     const errorDisplay = inputControl.querySelector('.error');

    //     errorDisplay.innerText = message;
    //     inputControl.classlist.add('error');
    //     inputControl.classlist.remove('success');
    // };

    // const isValidEmail = email =>{
    //     const  re= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     return re.test(String (email).toLowerCase());
    // }

    // const validateInputs = () => {
    //     const usernameValue = username.value.trim();
    //     const emailValue = email.value.trim();
    //     const passwordValue = password.value.trim();

    //     if(usernameValue == ''){
    //         setError(username, 'username is required');
    //     }else{
    //         setSuccess(username);
    //     }
    //     if(emailValue === ''){
    //         setError(email, 'Email is required');
    //     }else if(!isValidEmail(emailValue)){
    //         setError(email, 'Provide a valid email address');
    //     }
    //     if(passwordValue ===''){
    //         setError(password, 'Paswword is required');
    //     }else if(passwordValue.length <8 ){
    //         setError(password, 'Password must be at least 8 character.');
    //     } else {
    //         setSuccess(password);
    //     }
    // }




