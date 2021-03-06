var models = require('../models');

exports.myProfile = function(req, res){
    if (!req.user) {
        console.log("Attempting to view profile when not logged in");
        res.redirect('login');
        return;
    }
    var user = req.user;
    var boxes;

    models.Boxes
        .find({"user": user.username}).sort({"box":1})
        .exec(renderBoxes);

    function renderBoxes(err, boxlist) {
        if (err) console.log(err);
        boxes = boxlist;
        models.Boxes
            .find({"_id": { $in: user.likes}}).sort({"lastModifiedDate":1})
            .exec(renderLikes);
    }

    function renderLikes(err, likedBoxes) {
        if (err) console.log(err);
	    res.render('profile', {'user': user, 'boxes': boxes, 'likes': likedBoxes,
         'myProfile': true, 'sessionUser': true});
    }
};


exports.view = function(req, res){
    var username = req.query.username;
    var sessionUser;
    if (req.user) {
        sessionUser = req.user.username;    
        if (sessionUser == username) {
            res.redirect('myprofile');
            return;
        }
    }

    var user;
    var boxes;
    models.Users
        .find({"username": username})
        .exec(renderUser);

    function renderUser(err, users) {
        if (err || users == "") {
            res.redirect('home');
            return;
        }
        user = users[0];
        models.Boxes
            .find({"user": user.username}).sort({"box" : 1})
            .exec(renderBoxes);
    }

    function renderBoxes(err, boxlist) {
        if (err) console.log(err);
        boxes = boxlist;
        models.Boxes
            .find({"box": { $in: user.likes}}).sort({"box": 1}) 
            .exec(renderLikes);
    }

    function renderLikes(err, likedBoxes) {
	    res.render('profile', {'user': user, 'boxes': boxes, 'likes': likedBoxes,
         'myProfile': "", 'sessionUser': sessionUser});
    }
};
