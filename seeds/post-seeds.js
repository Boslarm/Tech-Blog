const { Post } = require('../models');

const postData = [{
        title: 'Coding is fun.',
        body: 'I thought codiing would be boring, but boy was I wrong!',
        user_id: 1

    },
    {
        title: 'Bootcamp is great.',
        body: 'This is the best was to learn how to code. Who needs a 4 year degree?!?!',
        user_id: 2
    },
    {
        title: 'I am learning a lot!',
        body: 'We cover so much in this bootcamp.',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;