from flask import Flask, session, render_template, request, redirect, url_for
from py import *
from py import Twitter
from py import Instagram
import json
import os
#from alchemy import analyze

app = Flask(__name__)
app.config.from_object('py.config')

env = app.jinja_env
env.line_statement_prefix = '='

#@app.route("/")
#def index():
#    return render_template("index.html")

@app.route("/peopleresults")
def peopleresults():
    return render_template("peopleresults.html")

@app.route("/thingresults")
def thingresults():
    return render_template("thingresults.html")

@app.route ("/Twitter1/<user>")
def TwitterFavorite(user):
    try: 
        tweets = session ["Twitter"]
    except:
        tweets = Twitter.get_User_Timeline (user)
        session ["Twitter"] = tweets
    # tweets = Twitter.get_User_Timeline ('nikhilgoya_l')
    data = Twitter.cruchData (tweets)
    favorite_vals = data["favorite_vals"]
    text_vals = data ["tweet_text"]
    retweet_vals = data["retweet_vals"]
    #favorite_vals = [1,2,3]
    #text_vals =  ['a','b','c']
    #print favorite_vals[1]

    return render_template ("/Graphs/TweetsFavoritesTime.html",favoriteVals=favorite_vals, textVals=text_vals)

@app.route ("/Twitter2/<user>")
def TwitterRetweet(user):
    try: 
        tweets = session ["Twitter"]
    except:
        tweets = Twitter.get_User_Timeline (user)
        session ["Twitter"] = tweets
    # tweets = Twitter.get_User_Timeline ('nikhilgoya_l')
    data = Twitter.cruchData (tweets)
    favorite_vals = data["favorite_vals"]
    text_vals = data ["tweet_text"]
    retweet_vals = data["retweet_vals"]
    #favorite_vals = [1,2,3]
    #text_vals =  ['a','b','c']
    #print favorite_vals[1]

    return render_template ("/Graphs/TweetsRetweetsTime.html",retweetVals=retweet_vals, textVals=text_vals)

@app.route ("/TwitterProfile/<user>")
def TwitterProfile(user):
 try: 
     tweets = session ["Twitter"]
 except:
     tweets = Twitter.get_User_Timeline (user)
     session ["Twitter"] = tweets
     data = Twitter.cruchData (tweets)
     return render_template ("/Graphs/TwitterReport.html",data=data)


@app.route ("/InstagramProfile/<user>")
def InstagramProfile(user):
    try: 
        pics = session ["pics"]
    except:
        pics = Instagram.get_User_Data (user)
        session ["pics"] = pics
        return render_template ("/Graphs/InstagramReport.html",data=pics)


@app.route ("/Instagram1/<user>")
def InstagramStats (user):
    try: 
        pics = Instagram.get_User_Data (user)
        session ["Instagram"] = pics
        mediaStats = pics["media_stats"]
        commentVals = mediaStats ["comments_vals"]
        likesVals =  mediaStats ["likes_vals"]
        textVals =  mediaStats ["text_vals"]
        return render_template ("/Graphs/InstagramLikesFavorites.html",textVals=textVals, likesVals=likesVals,commentVals=commentVals)
    except:
        session ["Instagram"] = []
        return "data unavailable"
    

@app.route("/", methods = ['GET', 'POST'])
def index():
    if request.method == "GET": 
        return render_template("index.html")
    if request.method == "POST" and request.form['id'] == "things":
        word = request.form['word'].encode ('ascii',"ignore")
        os.system("python analyze.py " + word + " 10")
        with open ("Output.txt", "r") as myfile:
            data=myfile.readlines()
            print data
        
        return render_template ("thingresults.html", data=data, word=word)
    if request.method == "POST" and request.form['id'] == "people":
        return render_template ("peopleresults.html")


if __name__ == '__main__':
    app.debug = True;
    app.run()
