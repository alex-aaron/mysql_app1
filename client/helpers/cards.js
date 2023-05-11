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