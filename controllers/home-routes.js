const sequelize = require('../config/connections');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

// GET the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                }]
        });
        const posts = postData.map((post) =>
            post.get({ plain: true })
        );

        for (var idx = 0; idx < posts.length; idx++) {
            posts[idx].dateStringForPost = posts[idx].createdAt.toLocaleDateString();
        }
        res.render('all-posts', {
            posts,
            loggedIn: req.session.loggedIn,
            pageDescription: 'The Tech Blog'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//Get login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
//Get signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});
// Get single post
router.get("/post/:id", (req, res) => {
    Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    })
      .then((postData) => {
        if (postData) {
          const post = postData.get({ plain: true });
  
          res.render("single-post", { post });
        } else {
          res.status(404).end();
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });


module.exports = router;