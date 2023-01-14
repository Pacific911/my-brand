
const blogsDOM = document.getElementById('blogs-section');


let oldBlogs = JSON.parse(localStorage.getItem('users'))?? []
console.log(oldBlogs);

oldBlogs.forEach((blog, index) => {
    blogsDOM.insertAdjacentHTML(
      "beforebegin",
`<tr>
    <td>${index+1}</td>
    <td>${blog.name}</td>
    <td>${blog.message}</td>
    <td><button>Edit</button></td>
    <td><button data-id=${blog.id} class="delete">Delete</button></td>
</tr>
`
)})

const deleteButtons = [...document.getElementsByClassName('delete')]
console.log(deleteButtons);
deleteButtons.forEach(btn => {btn.addEventListener('click', (e) => {
    const deleteId = e.target.dataset.id 
    deleteBlog(deleteId);
})})

function deleteBlog(deleteId){
    const updatedBlogs = oldBlogs.filter( ({id}) => id != deleteId)
    console.log(updatedBlogs);
    localStorage.setItem('users', JSON.stringify(updatedBlogs))
    location.reload();
}


