const blogsDOM = document.querySelector('#blogs-section');
fetch(
  'https://my-brand-production-bf0a.up.railway.app/api/blog/retrieve/all',
)
  .then((response) => {
    return response.json();
  })

  .then((data) => {
    data.blogs.forEach((blog, index) => {
      blogsDOM.insertAdjacentHTML(
        'beforebegin',
        `<tr>
    <td>${index + 1}</td>
    <td>${blog.blogname}</td>
    <td><img src="${blog.image}"></td>
    <td>${blog.blogdescription}</td>
    <td><i class="fa fa-pencil-square-o" onclick = editBlog(${
      index + 1
    })></i></td>
    <td><i class="fa fa-trash delete"" data-id=${blog._id} ></i></td>
</tr>
`,
      );
    });
  })

  .catch((error) => {
    console.log(error);
  });

const deleteButtons = [...document.getElementsByClassName('delete')];
console.log(deleteButtons);
deleteButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const deleteId = e.target.dataset.id;
    deleteBlog(deleteId);
  });
});

function deleteBlog(deleteId) {
  const updatedBlogs = oldBlogs.filter(({ id }) => id != deleteId);
  console.log(updatedBlogs);
  localStorage.setItem('users', JSON.stringify(updatedBlogs));
  location.reload();
}

function editBlog(id) {
  window.location.href = `addBlogs.html?page=${id}`;
  console.log(id);
}
