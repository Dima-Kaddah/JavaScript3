'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      this.container.innerHTML = '';
      contributors.forEach(contributor => {
        const contrContainer = document.querySelector(
          '.contributors-container',
        );
        const contributorHolder = createAndAppend('div', contrContainer, {
          class: 'contributorHolder',
        });
        // set the json data in to array
        let arrContributor = [
          contributor.avatar_url,
          contributor.login,
          contributor.contributions,
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
              href: contributor.html_url,
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
      console.log('ContributorsView', contributors);
    }
  }

  window.ContributorsView = ContributorsView;
}
