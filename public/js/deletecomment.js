const deleteComment = async (event) => {
  event.preventDefault();
  // console.log("in delete comment");
  const postTitle = document.querySelector('#post-title').innerText;
  const commentBody = event.target.closest('#card-div').lastElementChild.innerText;
  console.log(commentBody);
  const commentUser = document.querySelector('#comment-user').innerText;
  // console.log(commentBody);

  const response = await fetch('/api/comments/delete', {
    method: 'DELETE',
    body: JSON.stringify({ commentBody, postTitle, commentUser }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.href = window.location.href;
  };

};

const deleteBtns = document.querySelectorAll('#delete-comment');

deleteBtns.forEach(btn => btn.addEventListener('click', deleteComment));