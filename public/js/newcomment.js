const newCommentHandler = async () => {

  // event.preventDefault();

  const commentBody = document.querySelector('#comment-text').value;
  const postTitle = document.querySelector('#post-title').innerHTML;

  document.querySelector('#comment-text').value = '';
  // console.log(postTitle);

  const response = await fetch('api/comments/new-comment', {
    method: 'POST',
    body: JSON.stringify({ commentBody, postTitle }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.href = window.location.href;
  };
};

document
  .querySelector('#new-comment')
  .addEventListener('click', newCommentHandler);