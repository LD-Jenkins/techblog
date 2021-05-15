const loginHandler = async (event) => {
  event.preventDefault();

  const userName = document.querySelector('#login-user').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (userName && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/${userName}`);
    }
  }
};

const signUpRedirect = () => {
  document.location.replace('/api/users/signup');
};

document
  .querySelector('#login-btn')
  .addEventListener('click', loginHandler);

document
  .querySelector('#signup-btn')
  .addEventListener('click', signUpRedirect);