const renderPost = (event) => {
  event.preventDefault();

  const postTitle = event.target.title;
  const response = fetch(`/api/posts/${postTitle}`, {
    method: 'GET'
  });

  
}

document
  .querySelector('.post-title')
  .addEventListener('click', renderPost);