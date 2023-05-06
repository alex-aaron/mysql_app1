
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

function createCardFooter(){
    let footer = document.createElement('div');
    footer.className = 'card-footer';
    footer.innerHTML = 'Comments';

    return footer;
}

function createCardRow(post){
    let date = post.date_added.toString();

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
    img.setAttribute('src', './images/5stars.png');
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
