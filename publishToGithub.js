const ghPages = require('gh-pages');
const path = require('path');

ghPages.publish(
    path.join(__dirname, 'build'),
    {
        repo: 'https://github.com/roveroniandrea/talentreeReact.git',
        branch: 'gh-pages',
    },
    (err) => {
        if (err) {
            console.log('Error while pushing to github: ', err);
        } else {
            console.log('Deployed successfully!');
        }
    }
);
