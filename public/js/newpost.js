const newPostHandler = async () => {

  const title = document.querySelector('#post-title').value;
  const body = document.querySelector('#post-body').value;

  const response = await fetch('api/posts/new-post', {
    method: 'POST',
    body: JSON.stringify({ title, body }),
    headers: { 'Content-Type': 'application/json' },
  });

  if(response.ok) {
    document.location.assign('/dashboard');
  };

};

document
  .querySelector('#new-post-btn')
  .addEventListener('click', newPostHandler);