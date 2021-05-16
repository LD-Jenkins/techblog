const signUpHandler = async () => {
 
  const userName = document.querySelector('#signup-user').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  if (userName && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.assign('/dashboard');
    } else {
      document.querySelector('#error-message').innerHTML = 'Invalid username or that username is already taken';
    }
  };
};

document
  .querySelector('#signup-btn')
  .addEventListener('click', signUpHandler);