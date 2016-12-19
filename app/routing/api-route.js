var path 			= require('path');
var friendData		= require('../data/friends.js');
var totalDifference = 0;

module.exports = function (app) {

	app.get('/api/friends', function(req, res){
		res.json(friendData);
	})


	app.post('/api/friends', function(req, res){
		var newFriend = req.body;

		for(var i = 0; i < newFriend.scores.length; i++) {
			if(newFriend.scores[i] == "1 (Strongly Disagree)") {
				newFriend.scores[i] = 1;
			} else if(newFriend.scores[i] == "5 (Strongly Agree)") {
				newFriend.scores[i] = 5;
			} else {
				newFriend.scores[i] = parseInt(newFriend.scores[i]);
			}
		}

		var differencesArray = [];

		for(var i = 0; i < friendData.length; i++) {

			var comparedFriend = friendData[i];
			var totalDifference = 0;
			
			for(var k = 0; k < comparedFriend.scores.length; k++) {
				var differenceOneScore = Math.abs(comparedFriend.scores[k] - newFriend.scores[k]);
				totalDifference += differenceOneScore;
			}

			differencesArray[i] = totalDifference;
		}

		var bestFriendNum = differencesArray[0];
		var bestFriendIndex = 0;

		for(var i = 1; i < differencesArray.length; i++) {
			if(differencesArray[i] < bestFriendNum) {
				bestFriendNum = differencesArray[i];
				bestFriendIndex = i;
			}
		}

		friendData.push(newFriend);

		res.json(friendData[bestFriendIndex]);
	})
}

// console.log(friendData)
// console.log(totalDifference)
// module.exports = function (app){
// 	app.get('/api/friends', function(req, res){
// 		res.json(friendData);
        
// 	});

// 	app.post('/api/friends', function(req, res){

// 		var greatMatch = {
// 			name: "",
// 			image: "",
// 			matchDifference: 1000
// 		};
// 		var usrData 	= req.body;
// 		var usrName 	= usrData.name;
// 		var usrImage 	= usrData.image;
// 		var usrScores 	= usrData.scores;
	

// 		var totalDifference = 0;
// 		console.log(friendData)
// 		console.log(totalDifference)
// 		for(var i = 0; i < [friendData].length-1; i++){
// 			console.log(friendData[i].name);
// 			totalDifference = 0;
			

// 				for(var j = 0; j < 10; j++){
// 				totalDifference += Math.abs(parseInt(usrScores[j]) - parseInt(friends[i].scores[j]));
				
// 				if (totalDifference <= greatMatch.friends){

// 					greatMatch.name = friendData[i].name;
// 					// console.log(greatMatch.name = friends[i].name	)
// 					greatMatch.photo = friendData[i].photo;
// 					greatMatch.matchDifference = totalDifference;
				
// 				}
// 			}
// 		}

		
//  friendData.push(usrData);
// 		res.json(greatMatch);
//         // console.log(greatMatch)
// 		// console.log(usrData)
// 	});
// };