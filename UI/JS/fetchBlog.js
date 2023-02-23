const blogsDOM = document.querySelector('#blogs-section');
fetch('https://my-brand-production-bf0a.up.railway.app/api/blog/retrieve/all')
  .then((response) => {
    return response.json();
  })

  .then((data) => {
    const size = data.blogs;
    for (let i = 0; i < size.length; i++) {
      blogsDOM.insertAdjacentHTML(
        'beforebegin',
        `<tr>
    <td>${i + 1}</td>
    <td>${size[i].blogname}</td>
    <td><img src="${size[i].image}"></td>
    <td>${size[i].blogdescription}</td>
    <td><i class="fa fa-pencil-square-o" onclick = editBlog('${size[i]._id}')></i></td>
    <td><i class="fa fa-trash delete"" id=${size[i]._id} ></i></td>
</tr>
`,
      );
      var deleteBlog = document.querySelectorAll('.delete');
      deleteBlog[i].addEventListener('click', async (e) => {
        e.preventDefault();

        var cookies = document.cookie
          .split(';')
          .map((cookie) => cookie.split('='))
          .reduce(
            (accumulator, [key, value]) => ({
              ...accumulator,
              [key.trim()]: decodeURIComponent(value),
            }),
            {},
          );
        // var myHeaders = new Headers();
        // myHeaders.append('Authorization', `Bearer ${cookies.jwt}`);

        var requestOptions = {
          method: 'DELETE',
          // headers: myHeaders,
        };
        console.log(size[i]._id);

        const res = await fetch(`https://my-brand-production-bf0a.up.railway.app/api/blog/delete/${size[i]._id}`,

          {
            method: 'DELETE',
            headers: {
              Authentication: `Bearer ${cookies.jwt}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (!res.ok) {
               console.log(cookies.jwt);
          throw new Error(`Failed to delete blog with ID ${size[i]._id}`);
     
        }

        const data = await res.json()
        console.log(data);
      });
    }
  })

  .catch((error) => {
    console.log(error);
  });


// function deleteBlog(deleteId) {
//   const updatedBlogs = oldBlogs.filter(({ id }) => id != deleteId);
//   console.log(updatedBlogs);
//   localStorage.setItem('users', JSON.stringify(updatedBlogs));
//   location.reload();
// }

// const updatedBlogs = JSON.parse(localStorage.getItem('editBlog'));
// console.log('article:', updatedBlogs);
// fetch('https://my-brand-production-bf0a.up.railway.app/api/blog/update/{id}')
//   .then((response) => {
//     return response.json();
//   })
//   .then((response) => {
//     console.log(response.data);
//     updatedBlogs = response.data;
//   });

// function editBlog(id) {
//   window.location.href = `addBlogs.html?page=${id}`;
//   console.log(id);
// }
