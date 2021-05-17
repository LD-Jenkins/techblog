const deletePost = async () => {

  const postTitle = document.querySelector('#post-title').innerText;

  const response = await fetch('../api/posts/delete', {
    method: 'POST',
    body: JSON.stringify({ postTitle }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.href = window.location.href;
  };

};

document
  .querySelector('#delete-post')
  .addEventListener('click', deletePost);