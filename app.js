// **** Need to replace all of these console.logs with debug() ******

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const Twit = require('twit');
const path = require('path');

const config = require('./src/config');
const like = require('./src/like');
const retweet = require('./src/retweet');

const port = process.env.PORT || 3000;
const app = express();

// passes application details (API keys, secret tokens etc...)
// to Twitter npm module
const bot = new Twit(config);

app.use(express.static(path.join(__dirname, '/public/')));

bot.get('account/verify_credentials', {
  include_entities: false,
  skip_status: true,
  include_email: false
}, onAuthenticated);

function onAuthenticated(err, res) {
  if (err) {
      throw err;
  }

  console.log('Authentication successful. Running bot...\r\n');
}

app.set('view engine', 'ejs');



// Search parameters for tweets we want to favorite (like) 
const likeParams = {
  q: '#github OR #docker OR #fullstack',
  count: 1,
  result_type: 'recent',
  lang: 'en'
};

// Search parameters for tweets we want to retweet
const retweetParams = { 
  q: '#nodejs OR #express OR #ES6', 
  count: 1, 
  result_type: "recent",
  lang: 'en'
 };


const delay = 3600 * 1000;

// Use SetInterval function for running functions intermitantly  
// Hour = 3600 seconds and each second has 1000 ms => 3600 * 1000 ms
setInterval(() => {
  like(bot, likeParams);
  retweet(bot, retweetParams);
}, delay);

app.get('/', (req, res) => {
  res.render(
    'index',
  );
});


app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});