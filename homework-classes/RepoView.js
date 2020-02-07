'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code
      this.container.innerHTML = '';
      const repoContainer = document.querySelector('.repo-container');
      //create table for repos
      const table = createAndAppend('table', repoContainer);
      table.classList.add('reposTable');
      //make arry for new keys to show
      const displayKeys = ['Repository:', 'Description:', 'Forks:', 'Updated:'];
      //make array of keys from repo json object
      const keysNeeded = [
        repo.name,
        repo.description,
        repo.fork,
        repo.updated_at,
      ];
      //loop to get new name for keys and set the value
      for (let i = 0; i < displayKeys.length; i++) {
        let tr = createAndAppend('tr', table);
        //tr for new keys
        createAndAppend('th', tr, { text: displayKeys[i] });
        //make a tag for repo name
        if (i === 0) {
          createAndAppend('a', tr, {
            text: repo.name,
            href: repo.html_url,
            target: '_blank',
          });
          //make td for rest of info 'from jeson data'
        } else {
          createAndAppend('td', tr, { text: keysNeeded[i] });
        }
      }
      console.log('RepoView', repo);
    }
  }

  window.RepoView = RepoView;
}
