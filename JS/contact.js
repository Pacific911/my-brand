
const form = document.getElementById('form');
const {name,email,subject,message} = form;

let oldMessages = JSON.parse(localStorage.getItem('messages')) ?? [];
form.addEventListener('submit', (e) =>{
    e.preventDefault();
   
    const currentMessage = {
        id: crypto.randomUUID(),
        name : name.value,
        email : email.value,
        subject : subject.value,
        message : message.value,
        createdAt : Date.now(),
    }
    console.log(currentMessage)
    console.log(`State of old messages: ${oldMessages}`)
    oldMessages.push(currentMessage);
    validateForm(form) &&  localStorage.setItem('messages', JSON.stringify(oldMessages));
    document.getElementById('form').reset();

    
})



// validate input fields
const validateForm = (form) => {
    let isRequired = true;
    // Check for Required Name
    if (form.name.value.trim() === '') {
      setInvalid(form.name, 'Name is Required!');
      isRequired = false;
    } else if (!validName(form.name.value.trim())) {
      setInvalid(form.name, 'Name must be 3 - 50 characters!');
    } else {
      setSuccess(form.name);
    }
    // Check for Required Email
    if (form.email.value.trim() === '') {
      setInvalid(form.email, 'Email is required!');
      isRequired = false;
    } else if (!validEmail(form.email.value.trim())) {
      setInvalid(form.email, 'Email is not valid!');
    } else {
      setSuccess(form.email);
    }
    // Check for Required Subject
    if (form.subject.value.trim() === '') {
      setInvalid(form.subject, 'Subject is Required!');
    } else if (!validSubject(form.subject.value.trim())) {
      setInvalid(form.subject, 'Subject must be 3 - 30 characters!');
    } else {
      setSuccess(form.subject);
    }
    // Check for Required Message
    if (form.message.value.trim() === '') {
      setInvalid(form.message, 'Message is Required!');
      isRequired = false;
    } else if (!validMessage(form.message.value.trim())) {
      setInvalid(form.message, 'Message must be 10 - 500 characters!');
    } else {
      setSuccess(form.message);
    }
    return isRequired;
  };
  // Set for Success Input Value
  const setSuccess = (input) => {
    const inputBox = input.parentElement;
    inputBox.className = 'form-control success';
    const formAlert = inputBox.querySelector('.error');
    formAlert.innerHTML = '';
  };
  // Set for Invalid Input Value
  const setInvalid = (input, message) => {
    const inputBox = input.parentElement;
    const formAlert = inputBox.querySelector('.error');
    inputBox.className = 'form-control invalid';
    formAlert.innerHTML = message;
  };
  // Set for Valid Email Value
  const validEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };
  // set for valid name value
  const validName = (name) => {
    const re = /^.{3,50}$/;
    return re.test(name);
  };
  // set for valid subject value
  const validSubject = (subject) => {
    const re = /^.{3,30}$/;
    return re.test(subject);
  };
  // set for valid message value
  const validMessage = (message) => {
    const re = /^.{10,500}$/;
    return re.test(message);
  };

