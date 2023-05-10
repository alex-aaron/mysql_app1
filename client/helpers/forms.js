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

  function createCommentEditForm(comment){
    let outerDiv = document.createElement('div');
    let outerDivId = "comments-" + comment.id + "-edit-form-container";
    outerDiv.className = "collapse comment-edit-form-container";
    outerDiv.setAttribute('id', outerDivId);

    let form = document.createElement('form');
    let id = "comments-" + comment.id + "-edit-form";
    form.setAttribute('id', id);

    let div = document.createElement('div');
    div.className = 'form-group';

    let label = document.createElement('label');
    label.innerHTML = 'Edit Comment';
    label.setAttribute('for', "edit-comment-input");

    let textArea = document.createElement('textarea');
    let textAreaId = "comments-" + comment.id + "-edit-comment-input";
    textArea.setAttribute('id', textAreaId);
    textArea.className = 'form-control';
    textArea.setAttribute('cols', '40');
    textArea.innerHTML = comment.text;

    let submit = document.createElement('button');
    let submitId = "comments-" + comment.id + "-form-submit";
    submit.innerHTML = 'Submit Edits';
    submit.className = "btn btn-primary edit-comment-submit";
    submit.setAttribute('type', 'submit');
    submit.setAttribute('id', submitId);

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        handleEditComment(e.target);
    })

    div.append(label);
    div.append(textArea);
    div.append(submit);

    form.append(div);
    outerDiv.append(form);

    return outerDiv;
  }