let form = document.querySelector('#signup-form');
let users = JSON.parse(localStorage.getItem("users")) ?? [];
function storedData(currentUser){
    
    // if(!localStorage.getItem("users") ){
    //     users = [];
    // }
    // else{
    //     users = JSON.parse(localStorage.getItem("users"));
    // }
    // users.push(user);
    users.push(currentUser)
    localStorage.setItem("users", JSON.stringify(users));
    alert('Registered Successfully');

}
form.addEventListener('submit', (e) =>{
    e.preventDefault();

    // validateInputs();

    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var pass = document.getElementById('password').value;



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

    var user = {
        email:email,
        username:username,
        password:pass,

    };
    console.log(user);
    storedData(user)

    
    
})




