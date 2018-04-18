var friendData = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {
        console.log("Got Friend Post", req.body)
        let body = req.body;

        let scores = body.scores.map(function(s) {
            return s[0] ? parseInt(s[0]) : -1;
        });

        let friendsWithDiffScore = friendData.map(function(friend) {
            let diffScore = scores.map(function(score, idx) {
                return Math.abs(score - friend.scores[idx]);
            }).reduce(function(acc, d) {
                return acc + d;
            }, 0);
            return {
                name: friend.name,
                photo: friend.photo,
                diffScore: diffScore
            }      
        });

        friendsWithDiffScore.sort(function(a, b) {
            console.log("compare", a, b);
            return a.diffScore - b.diffScore;
        })

        console.log("ordered friends", friendsWithDiffScore);

        let matchingFriend = friendsWithDiffScore[0];
        res.json(matchingFriend);

    });
}
