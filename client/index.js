document.addEventListener('DOMContentLoaded', function(){
  console.log('hit this');
  fetch('http://localhost:5000/posts')
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
})


