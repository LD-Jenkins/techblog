const deleteComment = async () => {

  // console.log("in delete comment");
  const postTitle = document.querySelector('#post-title').innerText;
  const commentBody = document.querySelector('#posted-comment-body').innerText;
  // console.log(commentBody);

  const response = await fetch('../api/comments/delete', {
    method: 'POST',
    body: JSON.stringify({ commentBody, postTitle }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.href = window.location.href;
  };

};

document
  .querySelector('#delete-comment')
  .addEventListener('click', deleteComment);