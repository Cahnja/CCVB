var DisplayProfile = function (data) { 
    name = data ["name"];
    loc = data ["location"];
    avg_favs = data["favorite_count"];
    avg_retweet = data["retweet_count"];
    most_popular_tweets = data["popularTweets"];
    proPic = data["profilePicture"];
    friends = data["friends_count"];
    followers = data["followers_count"];
    listed = data["listed_count"];
    description = data["description"];
    statusCount = data["statuses_count"];
}
