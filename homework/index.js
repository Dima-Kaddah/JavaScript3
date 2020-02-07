'use strict';

{
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

  // repos info to display when select it ---- step(2)
  function reposSet(reposDisplay, repos) {
    //create table for repos
    const table = createAndAppend('table', reposDisplay, {
      class: 'reposTable',
    });
    // table.classList.add('reposTable');
    //make arry for new keys to show
    const displayKeys = ['Repository:', 'Description:', 'Forks:', 'Updated:'];
    //make array of keys from repo json object
    const keysNeeded = [
      repos.name,
      repos.description,
      repos.fork,
      repos.updated_at,
    ];
    //loop to get new name for keys and set the value
    for (let i = 0; i < displayKeys.length; i++) {
      reposDisplay.classList.add('reposDisplay');
      let tr = createAndAppend('tr', table);
      //tr for new keys
      createAndAppend('th', tr, { text: displayKeys[i] });
      //make a tag for repo name
      if (i === 0) {
        createAndAppend('a', tr, {
          text: repos.name,
          href: repos.html_url,
          target: '_blank',
        });
        //make td for rest of info 'from jeson data'
      } else {
        createAndAppend('td', tr, { text: keysNeeded[i] });
      }
    }
  }

  //changes start from here

  // second Contributors fetch in this function ---- step(2)this function work together with reposSet function
  async function fetcContributors(contributorsDisplay, url) {
    try {
      const contributorInfo = await fetchJson(url);
      console.log(contributorInfo);

      contributorsDisplay.classList.add('contributorsDisplay');

      contributorInfo.forEach(contributors => {
        //create contributorHolder 'div' fr contributors
        const contributorHolder = createAndAppend('div', contributorsDisplay, {
          class: 'contributorHolder',
        });
        // set the json data in to array
        let arrContributor = [
          contributors.avatar_url,
          contributors.login,
          contributors.contributions,
        ];
        //loop in to array length to set info
        for (let i = 0; i < arrContributor.length; i++) {
          if (i === 0) {
            let ImgDiv = createAndAppend('div', contributorHolder, {
              class: 'ImgDiv',
            });
            let img = createAndAppend('img', ImgDiv);
            img.src = arrContributor[0];
          } else if (i === 1) {
            let loginName = createAndAppend('div', contributorHolder, {
              class: 'loginName',
            });
            createAndAppend('a', loginName, {
              text: arrContributor[1],
              href: contributors.html_url,
              target: '_blank',
            });
          } else if (i === 2) {
            let buttonDiv = createAndAppend('div', contributorHolder, {
              class: 'buttonDiv',
            });
            createAndAppend('button', buttonDiv, { text: arrContributor[2] });
          }
        }
      });
    } catch (err) {
      createAndAppend('div', contributorsDisplay, {
        text: err.message,
        class: 'alert-error',
      });
    }
  }

  //  first code ------ step(1)
  async function main(url) {
    try {
      // set some element with DOM
      const root = document.getElementById('root');
      const hDiv = createAndAppend('div', root);
      hDiv.classList.add('hDiv');
      const headline = createAndAppend('h1', hDiv);
      headline.innerText = 'HYF Repositories';
      headline.classList.add('headline');
      //fetch
      const repos = await fetchJson(url);
      console.log(repos);
      //create container
      const container = createAndAppend('div', root, { class: 'container' });
      // sort the names
      repos.sort((rep, next) => {
        return rep.name.localeCompare(next.name);
      });
      //create div for repos data
      const reposDisplay = createAndAppend('div', container);
      //create div for contributors data
      const contributorsDisplay = createAndAppend('div', container);
      //create select
      const select = createAndAppend('select', hDiv, { class: 'select' });
      //to display only 10 repos in the options
      // i make the i = -1 to get empty option
      //loop and create the options
      for (let i = -1; i < 10; i++) {
        if (i === -1) {
          createAndAppend('option', select, {
            text: 'please Select Repositories ',
            value: [i],
          });
        } else {
          createAndAppend('option', select, {
            text: repos[i].name.toLowerCase(),
            value: [i],
          });
        }
      }

      select.onchange = function() {
        //remove the divs and classes
        reposDisplay.innerText = '';
        reposDisplay.classList.remove('reposDisplay');
        contributorsDisplay.innerText = '';
        contributorsDisplay.classList.remove('contributorsDisplay');
        // select to display with the function
        //get the index of select = 10
        const selectIndex = select.value;
        reposSet(reposDisplay, repos[selectIndex]);
        fetcContributors(
          contributorsDisplay,
          repos[selectIndex].contributors_url,
        );
      };
      return;
    } catch (err) {
      createAndAppend('div', root, {
        text: err.message,
        class: 'alert-error',
      });
    }
  }
  /// main function and fetcContributors function will pass here
  async function fetchJson(url) {
    try {
      const promise = await axios.get(url).then(res => {
        return res.data;
      });
      return promise;
    } catch (err) {
      createAndAppend('div', root, {
        text: err.message,
        class: 'alert-error',
      });
    }
  }
  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
