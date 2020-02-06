'use strict';

const button = document.querySelector('button');
const STATUS_CODE_OK = 200;
const URL = 'https://redditmonika.herokuapp.com/';

button.addEventListener('click', e => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET',URL + 'users');
  xhr.onreadystatechange = (event) => {
    if (event.target.readyState === XMLHttpRequest.DONE && event.target.status === 200) {
      console.log(event.target.response);
      let response = JSON.parse(event.target.response);
      render(response);  // callback
    }
  };
  xhr.send();
})
 

function render(res) {
  console.log(res);
  const userList = res.users;
  const container = document.querySelector('.container');
  for(let i = 0; i < userList.length; i++) {
    if(userList[i].id % 2 === 0) {
      const p = document.createElement('p');
      p.innerText = `id: ${userList[i].id} name: ${userList[i].name}`;
      container.appendChild(p);
    }
  
  }
}