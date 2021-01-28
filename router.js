var express = require('express');
var router = express.Router();

const credential = {
        email: 'kritikayadav345@gmail.com',
        password: '12345',
    }
    // login user
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.end('Login Successfully..!')
    } else {
        res.end('Invalid Username or Password');
    }
})

// route for dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user })
    } else {
        res.send('Unauthorized User')
    }
})

// route for logout
router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
            res.send('Error');
        } else {
            res.render('app', { title: 'Express', logout: 'Logout Successfully!!!😀' })
        }
    })
})

module.exports = router;