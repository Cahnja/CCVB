import requests
import json
from urllib2 import urlopen
from instagram.client import InstagramAPI
import functions


#AccountCreated
#https://github.com/Instagram/python-instagram
#pip install python-instagram SUCCESSFUL

CLIENT_ID = 'fc3ea612a2124506b409ac77b5b3c068'
CLIENT_SECRET = '95ff2f2aedd248498b1a79535c05107d'
access_token='1267672900.1fb234f.ab78269e1b754039b0e900a966e14fdb'
count = 1
#api = InstagramAPI(client_id="CLIENT_ID", client_secret='CLIENT_SECRET')
api = InstagramAPI(access_token=access_token)


def get_User_ID (username):
    #find user_id
    #user =  api.user_search(username, 1)[0]   
    url = ("https://api.instagram.com/v1/users/search?q=%s&access_token=%s") %(username,access_token)
    response = urlopen(url)
    json_raw = response.read()
    json_data = json.loads(json_raw)
    user_id = json_data["data"][0]["id"]
    return user_id

def get_User_Data (username):
    user_id = get_User_ID (username)
    #find user
    #doing it myself because the library is aweful...
    url = ("https://api.instagram.com/v1/users/%s/?access_token=%s") %(user_id,access_token)
    response = urlopen(url)
    json_raw = response.read()
    json_data = json.loads(json_raw)
    full_name = json_data["data"]["full_name"]
    bio  = json_data["data"]["bio"]
    website = json_data["data"]["website"]
    proPic = json_data["data"]["profile_picture"] 
    counts = json_data["data"]["counts"]
    total_media = counts ["media"]
    followed_by  = counts ["followed_by"]
    follows =  counts ["follows"]
    media = get_media (user_id)

    data = {}
    data ["full_name"] = full_name
    data ["bio"] = bio
    data ["website"] = website
    data ["pro_pic"] = proPic
    data ["total_media"] = total_media
    data ["followed_by"] = followed_by
    data ["follows"] = follows
    data ["media_stats"] = media
    return data

def get_media (user_id):
    url = ("https://api.instagram.com/v1/users/%s/media/recent/?access_token=%s") % (user_id,access_token)
    response = urlopen(url)
    json_raw = response.read()
    json_data = json.loads(json_raw)["data"]
    # print json_data[0]["caption"]['text']
    allMedia = []

    #img_ex =  json_data[0]
    #print json.dumps(img_ex, sort_keys=True, indent=4, separators=(',', ':'))
    #print img_ex["images"]["thumbnail"]["url"]
    
    for image in json_data:
        try:
            allMedia.append ({
                "like_count":image["likes"]["count"],
                "comment_count": image["comments"]["count"],
                "text":image['caption']['text'],
                "link":image["link"],
                "thumbnail":image["images"]["thumbnail"]["url"]
            })
        except:
            print "error"
    finalMedia = crunchData(allMedia)
    return finalMedia

def crunchData (media_array):
    finalData = media_array[0]
    likes_count = 0
    comments_count = 0
    eng_count = 0
    likes_vals = []
    eng_vals = []
    comments_vals = []
    text_vals = []
    img_vals = []
    media_count = len (media_array)

    #Calculate Average Values
    for photo in media_array:
        likes_count = likes_count + photo["like_count"]
        likes_vals.append (photo["like_count"])
        comments_count = comments_count + photo["comment_count"]
        comments_vals.append (photo["comment_count"])
        eng_count = eng_count + photo["comment_count"] + photo["like_count"]
        eng_vals.append (photo["comment_count"] + photo["like_count"])
        text_vals.append(photo["text"])
        img_vals.append(photo["thumbnail"]);

    avg_likes_count = likes_count / media_count
    avg_comments_count = comments_count /  media_count
    
    #Update finalData array
    finalData["like_count"] = avg_likes_count
    finalData["comment_count"] = avg_comments_count
    
   
    popMediaText = []
    popMediaLink = []
    popMediaImage = []
    #Find awesome media
    for photo in media_array:
        likes = photo["like_count"]
        comments = photo["comment_count"]
        pop = functions.isPopular (likes,likes_vals)
        pop2 = functions.isPopular (comments, comments_vals)
        if pop or pop2:
           popMediaText.append (photo["text"])
           popMediaLink.append (photo["link"])
           popMediaImage.append (photo["thumbnail"])

    while len(popMediaText) < 3:
        popMediaText.append ("Media not available")
        popMediaImage.append ("http://www.lse.ac.uk/CPNSS/visitorsprogramme/visitorpics/keep-calm-no-image-available.png")
        popMediaLink.append("http://www.lse.ac.uk/CPNSS/visitorsprogramme/visitorpics/keep-calm-no-image-available.png")


    #all of the actual numbers
    finalData["comments_vals"] = comments_vals
    finalData["likes_vals"] = likes_vals
    finalData["text_vals"] =  text_vals
    finalData["eng_vals"] = eng_vals
    finalData["images"] = img_vals
    
    #Add awesome media to finalData
    finalData["link"] = popMediaLink
    finalData["text"] = popMediaText
    finalData["thumbnails"] = popMediaImage
    return finalData
        
if __name__ == '__main__':
    data = get_User_Data ('jennamarbles')
   # print data
