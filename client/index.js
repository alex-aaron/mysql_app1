document.addEventListener('DOMContentLoaded', function(){
  fetch('http://localhost:5000/posts')
  .then(res => res.json())
  .then(data => {
    renderAllPosts(data.data);
  });
})

const postInputForm = document.getElementById('post-input');
const title = document.getElementById('title-input');
const review = document.getElementById('review-input');
const star = document.getElementById('star-input');
const postInputBtn = document.getElementById('post-input-btn');
const posts = document.getElementById('posts-container');

postInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(title.value);
  console.log(review.value);
  console.log(star.value);
  fetch('http://localhost:5000/new', {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({title: title.value, review: review.value, 
      rating: star.value})
  })
  .then(response => response.json());
});

function renderAllPosts(posts){
  posts.forEach(post => createPostCard(post));
}

function createPostCard(post){
  let rating = post.rating;
  let id = "posts-" + post.id;
  let card = document.createElement('div');
  card.className = "card";
  card.setAttribute('id', id);

  let body = document.createElement('div');
  body.className = 'card-body post-body text-white bg-info';

  let title = document.createElement('h3');
  title.className = 'card-title post-title';
  title.innerHTML = post.title + " - " + rating + " Stars";

  let hr = document.createElement('hr');

  let review = document.createElement('p');
  review.className = 'card-text review-text';
  review.innerHTML = post.review;

  let footer = document.createElement('div');
  footer.className = 'card-footer';
  footer.innerHTML = 'Comments';

  body.append(title);
  body.append(hr);
  body.append(review);

  card.append(body);
  card.append(footer);

  posts.append(card);

}


// Helpers //
