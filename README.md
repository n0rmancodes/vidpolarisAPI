# vidpolarisAPI
the api for my [vidpolaris](https://n0rmancodes.github.io/vidpolaris) project, based off of [my old ytdl api](https://github.com/n0rmancodes/YTDL-API).

```
* = required parameter
```

*if you try to load certain tests, depending on if youtube is rate-limiting us, it may not work.*

## endpoints

### trending data via ```invidious```

```http://[host]/?trending=[region]&type=[type]```

```
type: music, gaming, news, movies
country*: a country from this list -> https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
```

[test this command (variation 1)](https://vidpolaris.herokuapp.com/?trending=us) => general trending list in the united states

[test this command (variation 2)](https://vidpolaris.herokuapp.com/?trending=ca&type=music) => music trending list in canada

### get all information on a video via ```node-ytdl-core```

```http://[host]/?info=1&url=[url]```


```
info*: 1
url*: video link (in https://youtube.com/watch?v= format)
```

[test this command](https://vidpolaris.herokuapp.com/?info=1&url=https://www.youtube.com/watch?v=Bey4XXJAqS8) => streaming links and info of a test video

### view/like/dislike count & other info

```http://[host]/?md=1&url=[url]```

```
md*: 1
url*: video link (in https://youtube.com/watch?v= format)
```

[test this command](https://vidpolaris.herokuapp.com/?md=1&url=https://www.youtube.com/watch?v=Bey4XXJAqS8) => view/like/dislike count of video

### translate any given text (used for comments)

```http://[host]/?translate=[text]&to=[language]```

```
translate*: text
to: language from google translate's list, converted to ISO 639-1 format (defualt: en)
```

[test this command (variation 1)](https://vidpolaris.herokuapp.com/?translate=hello+world&to=es) => "hello world" to spanish
[test this command (variation 2)](https://vidpolaris.herokuapp.com/?translate=hola+mondo) => "hola mondo" to english

### smart command (used to get highest quality videos via vidpolaris's smart quality feature)

```http://[host]/?smart=1&url=[url]```

```
smart*: 1
url*: video link (in https://youtube.com/watch?v= format)
```

[test this command](https://vidpolaris.herokuapp.com/?smart=1&url=https://www.youtube.com/watch?v=Bey4XXJAqS8) => gets highest quality itags of a video

### search videos anonymously

```http://[host]/?search=[query]```

```
search*: give any query and it turns back out 10 or less results
```

[test this command](https://vidpolaris.herokuapp.com/?search=test+video) => gives 10 results (or less) of videos that match "test video"

### search suggestions

```http://vidpolaris.herokuapp.com/?suggest=[query]```

```
suggest*: give any query and it gives you 10 or less suggestions
```

[test this command](https://vidpolaris.herokuapp.com/?search=test+video) => gives 10 results (or less) of search suggestions that match "test video"

### video comments

```http://[host]/?comments=1&token=[token]&url=[url]```


```
comments*: 1
url*: video link (in https://youtube.com/watch?v= format)
token: continuation after 20 comments, given in first response (if any)
```

[test this command](https://vidpolaris.herokuapp.com/?comments=1&url=https://youtube.com/watch?v=Bey4XXJAqS8) => gives 20 comments or less on the Robert Thicke song "Blurred Lines"

### specific video itag

```http://[host]/?itag=[itag]&url=[url]```

```
itag*: itag, found in smart response
url*: video link (in https://youtube.com/watch?v= format)
```

[test this command](https://vidpolaris.herokuapp.com/?itag=248&url=https://youtube.com/watch?v=Bey4XXJAqS8) => gives 480p itag of the Robert Thicke song "Blurred Lines"

### channel information (via ```invidious```)

```http://[host]/?channelId=[id]```

```
channelId*: youtube channel id
```

[test this command](https://vidpolaris.herokuapp.com/?channelId=UCDjb0dwTUZKZjJgSd1kJpBg) => returns channel information for RobinThickeVevo

### channel videos (via ```invidious```)

```http://[host]/?channelVideos=[id]```

```
channelVideos*: youtube channel id
page: a number (default: 1)
```

[test this command](https://vidpolaris.herokuapp.com/?channelVideos=UCDjb0dwTUZKZjJgSd1kJpBg) => returns channel videos of the channel RobinThickeVevo

### video thumbnails in the highest quality (via ```invidious```)

```http://[host]/?thumb=[id]```

```
thumb*: id of a video
```

[test this command](https://vidpolaris.herokuapp.com/?thumb=Bey4XXJAqS8) => returns thumbnail of a random video

### video captions (via ```invidious```)

```http://[host]/?subs=[id]&label=[label]```

```
subs: id of a video
label: provided by first response
```

[test this command (variation 1)](https://vidpolaris.herokuapp.com/?subs=Bey4XXJAqS8) => returns all possible subs of a random video

[test this command (variation 2)](https://vidpolaris.herokuapp.com/?subs=Bey4XXJAqS8&label=Chinese (China)) => returns chinese subs of a random video

*this command does not seem to work currently in the vidpolaris player*
