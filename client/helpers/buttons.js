function createAddCommentButton(postObj){
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Add Comment';
    let id = "posts-" + postObj.id + "-add-comment-btn";
    let dataTarget = "#posts-" + postObj.id + "-form-container";

    btn.setAttribute('id', id);
    btn.setAttribute('data-toggle', 'collapse');
    btn.setAttribute('data-target', dataTarget);

    btn.addEventListener('click', (e) => {
      console.log('button clicked');
      
    });

    return btn;
  }

  function createCommentsButton(postObj){
    let btn = document.createElement('button');
    let id = "posts-" + postObj.id + "-comments-btn";
    let dataTarget = "#posts-" + postObj.id + "-comments";
    btn.innerHTML = 'See Comments';
    btn.className = "btn btn-primary see-comments-button";
    btn.setAttribute('id', id);
    btn.setAttribute('data-toggle', "collapse");
    btn.setAttribute('data-target', dataTarget);
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      let comments = document.getElementById('posts-' + postObj.id + "-comments");
      console.log(comments.className); // collapse
      if (comments.className !== 'collapse show'){
        fetchPostComments(e.target);
      }
    })
    return btn;
  }

  function createEditCommentButton(comment){
    let id = "comments-" + comment.id + "-edit-btn";
    let target = "#comments-" + comment.id + "-edit-form-container";
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary comment-edit-button';
    btn.innerHTML = 'Edit Comment';
    btn.setAttribute('id', id);
    btn.setAttribute('data-toggle', 'collapse');
    btn.setAttribute('data-target', target);
    
  
    return btn;
  }
  
  function createDeleteCommentButton(comment){
    let id = "comments-" + comment.id + "-delete-btn";
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary comment-delete-button';
    btn.innerHTML = 'Delete Comment';
    btn.setAttribute('id', id);
    btn.setAttribute('data-toggle', 'collapse');
    
    btn.addEventListener('click', (e) => {
      let commentId = e.target.id.split("-")[1];
      handleDeleteComment(commentId);
    })
  
    return btn;
  }