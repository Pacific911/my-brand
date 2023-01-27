let url="";

var image = document.getElementById('img');
image.addEventListener('change',()=>{
    console.log('photo');
    const fr= new FileReader();
    fr.readAsDataURL(image.files[0]);
    fr.addEventListener('load',()=>{
        
        url= fr.result
        console.log('url');
    })
});

function  clearForm(){
    document.getElementById('name').value = "";
    document.getElementById('img');
    document.getElementById('message').value = "";   
}

let form = document.getElementById('btn');
form.addEventListener('click', (e) =>{
    e.preventDefault();
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;
    

    var user = {
        id: crypto.randomUUID(),
        name:name,
        img:url,
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
    alert('blog added Successfully');
    clearForm();
})






