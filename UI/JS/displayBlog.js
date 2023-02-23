fetch('https://my-brand-production-bf0a.up.railway.app/api/blog/retrieve/all')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((blog) => {
      console.log(blog._id);
      const row = document.querySelector('.row');
      const blog_col = document.createElement('div');
      blog_col.classList.add('blog-col');
      const img = document.createElement('img');
      const contentData = document.createElement('div');
      const paragraph = document.createElement('p');
      const link = document.createElement('a');
      let button = `<button class='viewBlog' onclick = "BlogFunc('${blog._id}')" >Read more</button>`;
      link.innerHTML = button;
      img.src = blog.image;
      let Y = document.createTextNode(blog.blogname);
      paragraph.appendChild(Y);

      contentData.innerHTML = paragraph.outerHTML + link.outerHTML;
      blog_col.innerHTML = img.outerHTML + contentData.outerHTML;

      row.appendChild(blog_col);
    });
  });
function BlogFunc(id) {
  window.location.href = `../viewBlog.html?page=${id}`;
}
// }
