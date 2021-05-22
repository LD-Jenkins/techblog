const deletePost = async () => {

  const postTitle = document.querySelector('#post-title').innerText;

  const response = await fetch('/api/posts/delete', {
    method: 'DELETE',
    body: JSON.stringify({ postTitle }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.assign('/');
  };

};

document
  .querySelector('#delete-post')
  .addEventListener('click', deletePost);