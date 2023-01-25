const messagesDOM = document.getElementById('blogs-section');


let oldMessages = JSON.parse(localStorage.getItem('messages'))?? []
console.log(oldMessages);

oldMessages.forEach((message, index) => {
    messagesDOM.insertAdjacentHTML(
      "beforebegin",
`<tr>
    <td>${index+1}</td>
    <td>${message.name}</td>
    <td>${message.email}</td>
    <td>${message.subject}</td>
    <td>${message.message}</td>
    <td><a href="mailto:${message.email}">Reply</a></td>
    <td><i class="fa fa-trash-o delete" data-id=${message.id}></i></td>
</tr>
`
)})

const deleteButtons = [...document.getElementsByClassName('delete')]
console.log(deleteButtons);
deleteButtons.forEach(btn => {btn.addEventListener('click', (e) => {
    const deleteId = e.target.dataset.id 
    deleteMessage(deleteId);
})})

function deleteMessage(deleteId){
    const updatedMessages = oldMessages.filter( ({id}) => id != deleteId)
    console.log(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages))
    location.reload();
}
