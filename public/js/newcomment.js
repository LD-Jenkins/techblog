const newCommentHandler = async () => {

  // event.preventDefault();
  // console.log("in new comment");
  const commentBody = document.querySelector('#comment-text').value;
  const postTitle = document.querySelector('#post-title').innerHTML;

  document.querySelector('#comment-text').value = '';
  // console.log(postTitle);

  const response = await fetch('/api/comments/newcomment', {
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