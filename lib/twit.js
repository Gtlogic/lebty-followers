var Twit = require('twit'),
    twit = new Twit({
      consumer_key: '',
      consumer_secret: '',
      access_token: '',
      access_token_secret: ''
    }),
    getFollowers;

// get followers ids from twitter
getFollowers = function(cursor, callback, followers) {

  followers = followers || [];
  var options = {
    screen_name: 'lebtivity',
    count: 200
  };

  if (cursor) {
    options.cursor = cursor;
  }

  twit.get('followers/list', options,  function (err, reply) {
    console.log('reply!');
    reply.users.forEach(function(user) {
      followers.push({
        name: user.name,
        location: user.location,
        image: user.profile_image_url,
        url: user.url,
        userId: user.id,
        screenName: user.screen_name,
        description: user.description,
        followersCount: user.followers_count,
        friendsCount: user.friends_count
      });
    });

    if (reply.next_cursor) {
      getFollowers(reply.next_cursor, callback, followers);
    } else {
      callback(followers);
    }

  });
};

exports.getFollowers = getFollowers;
