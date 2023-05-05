document.addEventListener('DOMContentLoaded', function(){
  console.log('hit this');
  fetch('http://localhost:5000/posts')
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
})

const postInputForm = document.getElementById('post-input-form');
const titleInput = document.getElementById('title-input');
const reviewInput = document.getElementById('review-input');
const starInput = document.getElementById('star-input');
const postInputBtn = document.getElementById('post-input-btn');

postInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
})

postInputBtn.addEventListener('click', () => {

});

function addPost()
