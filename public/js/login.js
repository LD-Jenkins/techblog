const loginHandler = async (event) => {
  // event.preventDefault();

  const userName = document.querySelector('#login-user').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  
  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ userName, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  // console.log(response.message);

  if (response.ok) {
    window.location.assign(`/dashboard`);
  } else {
    document.querySelector('#error-message').innerText = 'Incorrect email or password, please try again';
  }
  
};

document
  .querySelector('#login-btn')
  .addEventListener('click', loginHandler);