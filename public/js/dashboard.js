const dashBtnHandler = async (event) => {
  event.preventDefault();

  if (req.session.logged_in) {
    const userName = req.sessions.userName;
    const response = await fetch(`/${userName}`, {
      method: 'GET',
    });
    
  } else {
    document.location.replace('/login');
  }
};

document
  .querySelector('#dash-btn')
  .addEventListener('click', dashBtnHandler, { once: true });