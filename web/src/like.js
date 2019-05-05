
function like(bot, likeParams) {
  // Initiate your search using the above paramaters
  bot.get('search/tweets', likeParams, (err, data, response) => {
    // If there is no error, proceed
    if(!err){
      // Loop through the returned tweets
      for(let i = 0; i < data.statuses.length; i++){
        // Get the tweet Id from the returned data
        let id = { id: data.statuses[i].id_str }
        let tweet = data.statuses[0];
        // Try to Favorite the selected Tweet
        bot.post('favorites/create', id, (err, response) => {
          // If the like fails, log the error message
          if(err){
              console.log(`...Cannot like this tweet because: ERROR { ${err.message} }`);
            return;
          }
          // If the favorite is successful, log the url of the tweet
          else{
            let username = response.user.screen_name;
            let tweetId = response.id_str;
            console.log(`***SUCCESS, YOU JUST LIKED THE FOLLOWING TWEET: ${tweet.text}`);
            // console.log('Success, you just liked the following tweet: ', `https://twitter.com/${username}/status/${tweetId}`);
          }
        });
      }
    } else {
      console.log(`...No new tweets with Hashtag: ${likeParams.q} at the moment.`);
    }
  });
 return;
}

module.exports = like;
