'use strict';

const registerForm = document.querySelector('form');
const URL = 'https://redditmonika.herokuapp.com/';

registerForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const dataToSend = { name: username };
  const json = JSON.stringify(dataToSend);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', URL + 'register');
  xhr.onreadystatechange = (event) => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      myCallback(event.target.response);
    }
  };
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(json);
  registerForm.reset();
});

function myCallback(res) {
  console.log(JSON.parse(res))
}
