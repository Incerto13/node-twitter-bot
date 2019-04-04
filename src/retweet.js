
function retweet(bot, retweetParams, next) {
  //Send a GET Request to search/tweets inorder to get the tweets with the Query 
  bot.get("search/tweets", retweetParams, (err, data) => {
          //Check for any errors 
          if (err) {
              console.log("Cannot Grab Latest Tweet On Hashtag: ", retweetParams.q);
              return; ///< exit function
          }
          // console.log("Data: ", data); ///< Quick Test

         //Make sure that the Data is valid 
         if (data && data.statuses.length > 0) {
           //Tweets are on an array on the searched object (data.statuses)
           let tweet = data.statuses[0];
           //We want to retweet only one tweet so we access the first one (0 index)
           // console.log(tweet); ///< LOG IT 
           //Retweet using the tweet's ID 
           bot.post("statuses/retweet/" + tweet.id_str, (err, res) => {
               //Any Errors?
               if (err) {
                   console.log(`...Cannot retweet this tweet because: ERROR { ${err.message} }`);
                   return;
               }
               //Success
               if (res) {
                   console.log(`***SUCCESS, YOU JUST RETWEETED THE FOLLOWING: ${tweet.text}`);
               }
           });
         } else {
           //Empty Statuses Array (Hashtag has no tweets!)
           console.log(`...No new Tweets with the Hashtag: ${retweetParams.q} at the moment.`);
         }
       });
      return;
     }

     module.exports = retweet;