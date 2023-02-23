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


