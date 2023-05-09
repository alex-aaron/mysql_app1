
function createCardBody(postObj){
    let body = document.createElement('div');
    body.className = 'card-body post-body text-white bg-info';

    let row = createCardRow(postObj);
    let hr = document.createElement('hr');

    let review = document.createElement('p');
    review.className = 'card-text review-text';
    review.innerHTML = postObj.review;

    body.append(row);
    body.append(hr);
    body.append(review);

    return body;
}

function createCardFooter(postObj){
    let footer = document.createElement('div');
    let id = "posts-" + postObj.id + "-footer";
    footer.setAttribute('id', id);
    footer.className = 'card-footer';

    let seeComments = createCommentsButton(postObj);
    let addComments = createAddCommentButton(postObj);
    let form = createCommentForm(postObj);

    let commentsDiv = document.createElement('div');
    let commentsDivId = "posts-" + postObj.id + "-comments";
    commentsDiv.className = 'collapse';
    commentsDiv.setAttribute('id', commentsDivId);

    footer.append(seeComments);
    footer.append(addComments);
    footer.append(form);
    footer.append(commentsDiv);

    return footer;
}

function createCardRow(post){
    let date = moment(post.date_added).format('MMMM Do, YYYY h:mma');
    let ratingPath = getRatingPath(post);

    let row = document.createElement('div');
    row.className = 'row';
    let col1 = document.createElement('div');
    col1.className = 'col';
    let col2 = document.createElement('div');
    col2.className = 'col text-center';
    let col3 = document.createElement('div');
    col3.className = 'col text-right';
    col3.innerHTML = date;

    let img = document.createElement('img');
    img.setAttribute('src', ratingPath);
    col2.append(img);

    let title = document.createElement('h3');
    title.className = 'card-title post-title';
    title.innerHTML = post.title;

    col1.append(title);

    row.append(col1);
    row.append(col2);
    row.append(col3);

    return row;
}

function getRatingPath(postObj) {
    let path = './images/'
    let stars;
    let str = postObj.rating.toString();
  
    if (!str.includes(".")) {
      stars = str[0] + "stars.png";
    } else if (str.includes(".") && str[0] === '0') {
      stars = "half-star.png"
    } else if (str.includes(".")) {
      stars = str[0] + "-halfstars.png";
    }
  
   return path + stars;
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
      fetchPostComments(e.target);
    })
    return btn;
  }

  function createFooterRow(postObj){
    let row = document.createElement('div');
    row.className = 'row';

    let col1 = document.createElement('div');
    col1.className = 'col-2 text-center';

    let col2 = document.createElement('div');
    col2.className = 'col-2 text-left';

    let seeComments = createCommentsButton(postObj);
    let addComment = createAddCommentButton(postObj);

    col1.append(seeComments);
    col2.append(addComment);

    row.append(col1);
    row.append(col2);

    return row;

  }

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
      // should invoke onClick function
    });

    return btn;
  }

  function createCommentForm(postObj){
    let outerDiv = document.createElement('div');
    let outerDivId = "posts-" + postObj.id + "-form-container";
    outerDiv.className = "collapse";
    outerDiv.setAttribute('id', outerDivId);

    let form = document.createElement('form');
    let id = "posts-" + postObj.id + "-form";
    form.setAttribute('id', id);

    let div = document.createElement('div');
    div.className = 'form-group';

    let label = document.createElement('label');
    label.innerHTML = 'Add Comment Here';
    label.setAttribute('for', "comment-input");

    let br = document.createElement('br');

    let submit = document.createElement('button');
    submit.innerHTML = 'Submit';
    submit.className = "btn btn-primary comment-form-submit";
    submit.setAttribute('type', 'submit');
    submit.setAttribute('id', 'comment-form-submit');

    let textArea = document.createElement('textarea');
    let textAreaId = "posts-" + postObj.id + "-comment-input";
    textArea.setAttribute('id', textAreaId);
    textArea.className = 'form-control';
    textArea.setAttribute('cols', '40');

    div.append(label);
    div.append(br);
    div.append(textArea);
    div.append(submit);
    form.append(div);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      postComment(e.target);
    });

    outerDiv.append(form);

    return outerDiv;
  }