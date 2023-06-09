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

function postComment(event){
  let postId = event.id.split("-")[1];
  let textAreaId = "posts-" + postId + "-comment-input";
  let comment = document.getElementById(textAreaId).value;
  let fetchPath = 'http://localhost:5000/comments/new';

  fetch(fetchPath, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({text: comment, entry_id: postId})
  })
  .then(response => response.json());
}

function renderAllPosts(posts){
  posts.forEach(post => createPostCard(post));
}

function fetchPostComments(target){
  console.log('hit fetch post comments');
  let postId = target.id.split("-")[1];
  let fetchPath = "http://localhost:5000/posts/" + postId + "/comments";
  console.log(fetchPath);
  fetch(fetchPath)
    .then(res => res.json())
    .then(data => {
      let comments = document.getElementById('posts-' + postId + "-comments" ).children;
      if (comments.length === 0){
        renderComments(data.data, postId);
      }
    });
}

function renderComments(comments, postId){
  console.log(comments);
  let divId = "posts-" + postId + "-comments"; 
  let div = document.getElementById(divId);
  if (comments.length > 0){
    let element = document.getElementById("posts-" + postId + "-no-comments-div");
    if (element){
      element.remove();
    }
    comments.forEach(comment => {
      let card = createCommentCard(comment);
      div.append(card);
    });
  } else {
    let noCommentsDiv = document.createElement('div');
    let id = "posts-" + postId + "-no-comments-div";
    noCommentsDiv.setAttribute('id', id);
    noCommentsDiv.className = 'no-comments-div';
    let p = document.createElement('p').innerHTML = 'This post has no comments';
    noCommentsDiv.append(p);
    div.append(noCommentsDiv);
  }
}

function createCommentCard(comment){
  let div = document.createElement('div');
  div.className = "card comment-card";

  let body = document.createElement('div');
  body.className = "card-body";

  let text = document.createElement('p');
  text.innerHTML = comment.text;

  let edit = createEditCommentButton(comment);
  let deleteComment = createDeleteCommentButton(comment);
  let editForm = createCommentEditForm(comment);

  body.append(text);
  body.append(edit);
  body.append(deleteComment);
  body.append(editForm);
  div.append(body);

  return div;
}


function createPostCard(post){
  let id = "posts-" + post.id;
  let card = document.createElement('div');
  card.className = "card";
  card.setAttribute('id', id);

  let body = createCardBody(post);

  let footer = createCardFooter(post);

  card.append(body);
  card.append(footer);

  posts.append(card);
}

function handleEditComment(target){
  console.log('hit handle edit comment function');
  let commentId = target.id.split("-")[1];
  let textId = "comments-" + commentId + "-edit-comment-input";
  let edits = document.getElementById(textId).value;
  let fetchPath = "http://localhost:5000/comments/" + commentId + "/edit";
  fetch(fetchPath, {
    headers: {
      'Content-type': 'application/json',
    },
    method: "PATCH",
    body: JSON.stringify({id: commentId, text: edits})
  }).then(response => response.json())
  .then(data => {
    if (data.success){
      location.reload()
    }
  });
}

function handleDeleteComment(id){
  console.log('handle delete comment');
  let fetchPath = "http://localhost:5000/comments/" + id + "/delete";
  console.log(fetchPath);
  fetch(fetchPath, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "DELETE",
    body: JSON.stringify({ id: id })
  }).then(response => response.json())
  .then(data => console.log(data));
}


