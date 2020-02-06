'use strict';

const registerForm = document.querySelector('form');

registerForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const dataToSend = { name: username };
  const json = JSON.stringify(dataToSend);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/register');
  xhr.onreadystatechange = (event) => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      myCallback(event.target.response);
    }
  };
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(json);
  registerForm();
});

function myCallback(res) {
  console.log(JSON.parse(res))
}
