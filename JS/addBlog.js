function  clearForm(){
    document.getElementById('name').value = "";
    document.getElementById('message').value = "";
}

let form = document.querySelector('#add-blog-form');
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;

    var user = {
        id: crypto.randomUUID(),
        name:name,
        message:message,
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
    alert('data added Successfully');
    clearForm();
})






