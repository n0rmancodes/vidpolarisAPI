console.log("vidpolaris API");
console.log("booting up....");
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
let filter;
const fetchComments = require('youtube-comment-api')
const http = require('http'); 
const translate = require('@vitalets/google-translate-api');
const url = require('url');
const ytScraper = require("yt-scraper");
const ytpl = require('ytpl');
const fetchVideoInfo = require('youtube-info');
const youtubeSuggest = require('youtube-suggest');
const req = require('request');
http.createServer(onrequest).listen(process.env.PORT || 3000);
console.log("listening on port 3000");
console.log("============================");

function onrequest(request, response) {
	var oUrl = url.parse(request.url, true);
	
	if (!oUrl.query.url && !oUrl.query.trending && !oUrl.query.channelId && !oUrl.query.channelVideos && !oUrl.query.search && !oUrl.query.subs && !oUrl.query.suggest && !oUrl.query.playlistId && !oUrl.query.translate && !oUrl.query.thumb) {
		var json = JSON.stringify ({
			"err": "noValidParams",
			"viewEndpoints": "https://github.com/n0rmancodes/vidpolarisAPI#endpoints"
		})
		response.writeHead(404, {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
		});
		response.end(json);
		return;
	} else {
		var dUrl = oUrl.query.url;
	}
	
	if (oUrl.query.trending) {
		if (oUrl.query.trending == "US" || oUrl.query.trending == "1") {
			req("https://invidio.us/api/v1/trending", function (error, res, body) {
				if (error) {
					var data = JSON.stringify({
						"err": "API error"
					})
					response.writeHead(404, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					})
					response.end(data);
				} else {
					response.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					})
					response.end(body);
				}
			})
		} else {
			req("https://invidio.us/api/v1/trending?region=" + oUrl.query.trending, function (error, res, body) {
				if (error) {
					var data = JSON.stringify({
						"err": "API error"
					})
					response.writeHead(404, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					})
					response.end(data);
				} else {
					response.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					})
					response.end(body);
				}
			})
		}
		return;
	}
	
//	if (oUrl.query.reccomended == "1") {
//		if (request.method == "GET") {
//			var data = JSON.stringify({
//				"err": "invalidRequestMethod"
//			})
//			response.writeHead(404, {
//				"Content-Type": "application/json",
//				"Access-Control-Allow-Origin": "*"
//			})
//			response.end(data);
//		} else {
//			if (!request.headers.history) {
//				var data = JSON.stringify({
//					"err": "invalidHeaders"
//				})
//				response.writeHead(404, {
//					"Content-Type": "application/json",
//					"Access-Control-Allow-Origin": "*"
//				})
//			} else {
//				
//			}
//		}
//		return;
//	}
	
	//if (oUrl.query.reddit) {
	//	req("https://reddit.com/r/videos/top.json", function (error, res, body) {
	//		if (error) {
	//			var data = JSON.stringify({
	//				"err": "API error"
	//			})
	//			response.writeHead(404, {
	//				"Content-Type": "application/json",
	//				"Access-Control-Allow-Origin": "*"
	//			})
	//			response.end(data);
	//		} else {
	//			var data = JSON.parse(body);
	//			fetchVideoInfo(data.data.children[0].data.url.substring(17), function (err, videoInfo) {
	//				var meta = videoInfo;
	//				var json = JSON.stringify({
	//					"url": data.data.children[0].data.url,
	//					"metadata": meta
	//				})
	//				response.writeHead(200, {
	//					"Content-Type": "application/json",
	//					"Access-Control-Allow-Origin": "*"
	//				});
	//				response.end(json);
	//			})
	//			return;
	//			
	//			console.log(data.data.children[1].data.url.substring(17))
	//			response.writeHead(200, {
	//				"Content-Type": "application/json",
	//				"Access-Control-Allow-Origin": "*"
	//			})
	//			response.end(json);
	//		}
	//	})
	//	return;
	//}
	
	if (oUrl.query.translate) {
		if (!oUrl.query.to) {
			var lang = "en"
		} else {
			var lang = oUrl.query.to;
		}
		var transText = oUrl.query.translate;
		translate(transText, {to: lang}).then(res => {
			var json = JSON.stringify ({
				res
			})
			response.writeHead(200, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json);
			return;
		})
		return;
	}
	
	if (oUrl.query.smart == "1") {
		var dUrl = oUrl.query.url;
		ytdl(dUrl, function(err, info) {
			if (err) {
				console.log("error!: " + err)
				var json = JSON.stringify ({
					"err": err
				})
				response.writeHead(404, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				});
				response.end(json)
				return;
			}
			if (!info.formats) {
				console.log("no formats found")
				var json = JSON.stringify ({
					"err": "noFormats"
				})
				response.writeHead(404, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				});
				response.end(json)
				return;
			}
			let vFormats = ytdl.filterFormats(info.formats, 'videoonly');
			let aFormats = ytdl.filterFormats(info.formats, 'audioonly');
			var json = JSON.stringify ({
				video: vFormats,
				audio: aFormats,
				info
			})
			response.writeHead(200, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json);
			return;
		})
	}
	
	if (oUrl.query.search) {
		var search = oUrl.query.search;
		ytsr.getFilters(search, function(err, filters) {
			filter = filters.get('Type').find(o => o.name === 'Video');
			var options = {
				limit: 10,
				nextpageRef: filter.ref,
			}
			ytsr(search, options, function(err, searchResults) {
				var json = JSON.stringify ({
					searchResults
				})
				response.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				});
				response.end(json);
			})
		})
		return;
	}
	
	if (oUrl.query.suggest) {
		var q = oUrl.query.suggest
		youtubeSuggest(q).then(function (results) {
			var json = JSON.stringify ({
				results
			})
			response.writeHead(200, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json);
			return;
		})
		return;
	}
	
	if (oUrl.query.playlistId) {
		var id = oUrl.query.playlistId
		ytpl(oUrl.query.playlistId, function(err, playlist) {
			if(err) throw err;
			var json = JSON.stringify ({
				playlist
			})
			response.writeHead(200, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json);
			return;
		});
		return;
	}
	
	if (oUrl.query.md === "1") {
		var md = oUrl.query.url
		var yt = url.parse(md);
		var id = yt.search.substring(3);
		if (!id) {
			var json = JSON.stringify ({
				"err": "noProperUrl"
			})
			response.writeHead(404, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json);
			console.log("invalid request")
			return;
		}
		fetchVideoInfo(id, function (err, videoInfo) {
			if (err) {
				var json = JSON.stringify ({
					"err": err
				})
				response.writeHead(404, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				});
				response.end(json);
				console.log("youtube-info err")
				console.log(err)
				return;
			} else {
				var json = JSON.stringify ({
					"meta": videoInfo
				})
				response.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				});
				response.end(json);
				return;
			}
		})
		return;
	}
	
	if (oUrl.query.info === "1") {
		var dUrl = oUrl.query.url;
		ytdl(dUrl, function(err, info) {
			if (!err) {
				var json = JSON.stringify ({
					info
				})
				response.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				});
				response.end(json);
			} else {
				var json = JSON.stringify ({
					err
				})
				response.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				});
				response.end(json);
			}
		})
		return;
	}
	
	if (oUrl.query.comments == "1") {
		var dUrl = oUrl.query.url;
		if (!dUrl.includes("http")) {
			var json = JSON.stringify ({
				"err": "mustHaveUrl"
			})
			response.writeHead(404, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json);
			console.log("invalid request")
			return;
		}
		var parsed = url.parse(dUrl)
		var id = parsed.search.substring(3)
		if (oUrl.query.token) {
			var token = oUrl.query.token;
			fetchComments(id, token)
				.then(commentPage => {
					var json = JSON.stringify({
						"comments": commentPage.comments,
						"npToken": commentPage.nextPageToken
					})
					response.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					response.end(json);
				})
		} else {
			fetchComments(id)
				.then(commentPage => {
					var json = JSON.stringify({
						"comments": commentPage.comments,
						"npToken": commentPage.nextPageToken
					})
					response.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					response.end(json);
				})
		}
		return;
	}
	
	if (oUrl.query.itag) {
		var itag = oUrl.query.itag;
		var dUrl = oUrl.query.url;
		if (!dUrl.includes("http")) {
			var json = JSON.stringify ({
				"err": "mustBeUrl"
			})
			response.writeHead(404, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json);
			console.log("invalid request")
			return;
		} else {
			ytdl(dUrl, function(err, info) {
				if (err) {
					console.log("error!: " + err)
					var json = JSON.stringify ({
						"err": err
					})
					response.writeHead(404, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					response.end(json)
					return;
				}
				if (!info.formats) {
					console.log("no formats found")
					var json = JSON.stringify ({
						"err": "noFormats"
					})
					response.writeHead(404, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					response.end(json)
					return;
				}
				let format = ytdl.chooseFormat(info.formats, { quality: itag });
				var json = JSON.stringify ({
					datainfo: format
				})
				response.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				});
				response.end(json);
			})
		}
		return;
	}
	
	if (oUrl.query.channelId) {
		req("https://invidio.us/api/v1/channels/" + oUrl.query.channelId, function (error, res, body) {
			if (error) {
				var data = JSON.stringify({
					"err": "API error"
				})
				response.writeHead(404, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				})
				response.end(data);
			} else {
				response.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				})
				response.end(body);
			}
		})
		return;
	}
	
	if (oUrl.query.channelVideos) {
		if (!oUrl.query.sortBy) {
			var sort = "latest";
		} else {
			var sort = oUrl.query.sortBy;
		}
		if (!oUrl.query.page) {
			var page = 1;
		} else {
			var page = oUrl.query.page;
		}
		req("https://invidio.us/api/v1/channels/videos/" + oUrl.query.channelVideos + "/?sort_by=" + sort + "&page=" + page, function (error, res, body) {
			if (error) {
				var data = JSON.stringify({
					"err": "API error"
				})
				response.writeHead(404, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				})
				response.end(data);
			} else {
				response.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				})
				response.end(body);
			}
		})
		return;
	}
	
	if (oUrl.query.thumb) {
		req('https://invidio.us/vi/' + oUrl.query.thumb + "/maxres.jpg").pipe(response);
		return;
	}
	
	if (oUrl.query.subs) {
		if (!oUrl.query.label) {
			req("https://invidio.us/api/v1/captions/" + oUrl.query.subs, function(error, res, body) {
				response.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				})
				response.end(body);
				return;
			})
		} else {
			req("https://invidio.us/api/v1/captions/" + oUrl.query.subs + "/?label=" + oUrl.query.label).pipe(response);
			return;
		}
		return;
	}
	
	ytdl(dUrl, function(err, info) {
		if (!dUrl.includes("http")) {
			var json = JSON.stringify ({
				"err": "mustBeUrl"
			})
			response.writeHead(200, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json);
			console.log("invalid request")
			return;
		}
		if (err) {
			console.log("error!: " + err)
			var json = JSON.stringify ({
				"err": err
			})
			response.writeHead(404, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json)
			return;
		}
		if (!info.formats) {
			console.log("no formats found")
			var json = JSON.stringify ({
				"err": "noFormats"
			})
			response.writeHead(404, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json)
			return;
		}
		let vaFormats = ytdl.filterFormats(info.formats, 'audioandvideo');
		var json = JSON.stringify ({
			datainfo: vaFormats
		})
		response.writeHead(200, {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
		});
		response.end(json);
	})
}
