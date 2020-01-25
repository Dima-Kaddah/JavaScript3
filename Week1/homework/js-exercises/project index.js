'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }
  const headline = createAndAppend('h1', root);
  headline.innerText = 'HYF Repositories';
  headline.classList.add('headline');

  //changes from here
  function renderRepoDetails(repo, ul) {
    //create li
    let li = createAndAppend('li', ul);
    //create table
    const table = createAndAppend('table', li);
    //male arry for new keys to show
    const displayKeys = ['Repository:', 'Description:', 'Forks:', 'Updated:'];
    //get the keys from repo object
    let keys = Object.keys(repo);
    //make array of keys from repo object
    const keysNeeded = [keys[2], keys[7], keys[8], keys[48]];
    //loop to get new name for keys and set the value
    for (let i = 0; i < displayKeys.length; i++) {
      let tr = createAndAppend('tr', table);
      createAndAppend('th', tr, { text: displayKeys[i] });
      //make a tag for repo name
      if (i === 0) {
        createAndAppend('a', tr, {
          text: repo.name,
          href: repo.html_url,
          target: '_blank',
        });
        //make td for rest of info
      } else {
        createAndAppend('td', tr, { text: repo[keysNeeded[i]] });
      }
    }
  }

  function main(url) {
    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      //create ul
      const ul = createAndAppend('ul', root);
      ul.classList.add('allUl');

      // sort the names
      repos.sort((rep, nestRep) => rep.name.localeCompare(nestRep.name));

      //to display only 10 repo
      for (let i = 38; i < repos.length; i++) {
        renderRepoDetails(repos[i], ul);
      }
    });
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
