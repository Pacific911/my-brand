fetch(
  'https://my-brand-production-bf0a.up.railway.app/api/blog/retrieve/all',
).then((response) => {
  return response.json();
});
let url = '';

var image = document.getElementById('image');
image.addEventListener('change', () => {
  console.log('photo');
  const fr = new FileReader();
  fr.readAsDataURL(image.files[0]);
  fr.addEventListener('load', () => {
    url = fr.result;
    console.log('url');
  });
});

function clearForm() {
  document.getElementById('blogname').value = '';
  document.getElementById('image');
  document.getElementById('blogdescription').value = '';
}

const form = document.getElementById('add-blog-form');
const { blogname, blogimage, blogdescription } = form;
const addBlog = async (blog) => {
  try {
    const response = await fetch(
      'https://my-brand-production-bf0a.up.railway.app/api/blog/create',
      {
        method: 'POST',
        credentials: 'include',
        body: blog,
        // headers: {
        //   Authorization: `${JSON.parse(localStorage.getItem('token'))}`,
        // },
      },
    );
    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.log(error);
  }
};
form.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('am here');

  const formdata = new FormData();
  formdata.append('blogname', blogname.value);
  formdata.append('image', blogimage.files[0]);
  formdata.append('blogdescription', blogdescription.value);

  addBlog(formdata);

  //   var name = document.getElementById('blogname').value;
  //   var message = document.getElementById('blogdescription').value;

  //   var user = {
  //     id: crypto.randomUUID(),
  //     name: blogname,
  //     img: url,
  //     message: blogdescription,
  //   };
  //   let users = [];
  //   const storedUsers = JSON.parse(localStorage.getItem('users'));
  //   if (!localStorage.getItem('users')) {
  //     users = [];
  //   } else {
  //     users = JSON.parse(localStorage.getItem('users'));
  //   }
  //   users.push(user);
  //   localStorage.setItem('users', JSON.stringify(users));
  //   alert('blog added Successfully');
  clearForm();
});
