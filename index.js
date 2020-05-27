console.log("vidpolaris API [version 1.2.3]");
console.log("")
console.log("[!] this product is in no way affiliated with google or youtube! use at your own risk!");
console.log("")
console.log("booting up....");
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
let filter;
const fetchComments = require('youtube-comment-api')
const http = require('http'); 
const translate = require('@vitalets/google-translate-api');
const url = require('url');
const ytpl = require('ytpl');
const youtubeSuggest = require('youtube-suggest');
const req = require('request');
http.createServer(onrequest).listen(process.env.PORT || 3000);
console.clear();
console.log("vidpolaris API [version 1.2.3]");
console.log("[!] this product is in no way affiliated with google or youtube! use at your own risk!");
console.log("listening on port " + (process.env.PORT || 3000));
console.log("============================");

function onrequest(request, response) {
	var oUrl = url.parse(request.url, true);
	
	if (!oUrl.query.url && !oUrl.query.reddit && !oUrl.query.redditSearch && !oUrl.query.trending && !oUrl.query.channelId && !oUrl.query.channelVideos && !oUrl.query.search && !oUrl.query.subs && !oUrl.query.suggest && !oUrl.query.playlistId && !oUrl.query.translate) {
		var json = JSON.stringify ({
			"err": "noValidParams",
			"viewEndpoints": "https://github.com/n0rmancodes/vidpolarisAPI#endpoints",
			"version": "1.2.3"
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
		if (!oUrl.query.inst) {
			var bUrl = "https://invidio.us/"
		} else if (oUrl.query.inst == "snopyta") {
			var bUrl = "https://invidious.snopyta.org/"
		} else if (oUrl.query.inst == "13ad") {
			var bUrl = "https://invidious.13ad.de/"
		} else if (oUrl.query.inst == "ggc") {
			var bUrl = "https://invidious.ggc-project.de/"
		} else {
			var bUrl = "https://invidio.us/"
		}
		if (!oUrl.query.type) {
			if (oUrl.query.trending == "US" || oUrl.query.trending == "1") {
				req(bUrl + "api/v1/trending", function (error, res, body) {
					if (!body) {
						var data = JSON.stringify({
							"err": "API error"
						})
						response.writeHead(404, {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						})
						response.end(data);
					} else if (body.includes("<!DOCTYPE")) {
						var data = JSON.stringify({
							"err": "API error"
						})
						response.writeHead(404, {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						})
						response.end(data);
					}
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
				req(bUrl + "api/v1/trending?region=" + oUrl.query.trending, function (error, res, body) {
					if (!body) {
						var data = JSON.stringify({
							"err": "API error"
						})
						response.writeHead(404, {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						})
						response.end(data);
					} else if (body.includes("<!DOCTYPE")) {
						var data = JSON.stringify({
							"err": "API error"
						})
						response.writeHead(404, {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						})
						response.end(data);
					}
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
		} else {
			if (oUrl.query.trending == "US" || oUrl.query.trending == "1") {
				req(bUrl + "api/v1/trending?type=" + oUrl.query.type, function (error, res, body) {
					if (!body) {
						var data = JSON.stringify({
							"err": "API error"
						})
						response.writeHead(404, {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						})
						response.end(data);
					} else if (body.includes("<!DOCTYPE")) {
						var data = JSON.stringify({
							"err": "API error"
						})
						response.writeHead(404, {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						})
						response.end(data);
					}
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
				req(bUrl +"api/v1/trending?region=" + oUrl.query.trending + "&type=" + oUrl.query.type, function (error, res, body) {
					if (!body) {
						var data = JSON.stringify({
							"err": "API error"
						})
						response.writeHead(404, {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						})
						response.end(data);
					} else if (body.includes("<!DOCTYPE")) {
						var data = JSON.stringify({
							"err": "API error"
						})
						response.writeHead(404, {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*"
						})
						response.end(data);
					}
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
	
	if (oUrl.query.reddit) {
		if (!oUrl.query.type) {
			let rDat = [];
			req("https://reddit.com/r/videos/top.json?limit=100", function (error, res, body) {
				var d = JSON.parse(body);
				for (var c in d.data.children) {
					if (!d.data.children[c].data.url) {return;}
					if (d.data.children[c].data.url.includes("youtu")) {
						if (d.data.children[c].data.media) {
							let dataBlock = {
								"title": d.data.children[c].data.media.oembed.title,
								"author": d.data.children[c].data.media.oembed.author_name,
								"id": getVidId(d.data.children[c].data.url),
								"originalUrl": d.data.children[c].data.url,
								"score": d.data.children[c].data.score
							}
							rDat.push(dataBlock);
						}
					} else {
						// do nothing
					}
				}
				response.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				});
				response.end(JSON.stringify(rDat));
			})
			return;
		} else if (oUrl.query.type == "music") {
			let rDat = [];
			req("https://reddit.com/r/music/top.json?limit=100", function (error, res, body) {
				var d = JSON.parse(body);
				for (var c in d.data.children) {
					if (!d.data.children[c].data.url) {return;}
					if (d.data.children[c].data.url.includes("youtu")) {
						if (d.data.children[c].data.media)  {
							let dataBlock = {
								"title": d.data.children[c].data.media.oembed.title,
								"author": d.data.children[c].data.media.oembed.author_name,
								"id": getVidId(d.data.children[c].data.url),
								"originalUrl": d.data.children[c].data.url,
								"score": d.data.children[c].data.score
							}
							rDat.push(dataBlock);
						}
					} else {
						// do nothing
					}
				}
				response.writeHead(200, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				});
				response.end(JSON.stringify(rDat));
			})
			return;
		} else {
			var rDat = {
				"err": "invalid type"
			}
			response.writeHead(404, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(JSON.stringify(rDat));
		}
	}
	
	if (oUrl.query.redditSearch) {
		let searchResults = [];
		if (oUrl.query.redditSearch.length == 11) {
			req("https://reddit.com/search.json?q=url:youtu.be/" + oUrl.query.redditSearch, function(err,res,body) {
				var d = JSON.parse(body);
				if (err | d.data.dist == 0) {
					var data = JSON.stringify({
						"err": "noResults"
					});
					response.writeHead(404, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					response.end(data);
				} else {
					for (var c in d.data.children) {
						var postDat = {
							"postTitle": d.data.children[c].data.title,
							"postScore": d.data.children[c].data.score,
							"postComNum": d.data.children[c].data.num_comments,
							"postSub": d.data.children[c].data.subreddit_name_prefixed,
							"postAuthor": "/u/" + d.data.children[c].data.author,
							"postLink": "https://reddit.com" + d.data.children[c].data.permalink
						}
						searchResults.push(postDat)
					}
					response.writeHead(200, {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					});
					response.end(JSON.stringify(searchResults));
				}
			})
		} else {
			var data = JSON.stringify({
				"err": "notValid"
			});
			response.writeHead(404, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(data);
		}
		return;
	}
	
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
		if (oUrl.query.type == "video") {
			ytsr.getFilters(search, function(err, filters) {
				filter = filters.get('Type').find(o => o.name === 'Video');
				var options = {
					limit: 100,
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
		} else if (oUrl.query.type == "channel") {
			ytsr.getFilters(search, function(err, filters) {
				filter = filters.get('Type').find(o => o.name === 'Channel');
				var options = {
					limit: 100,
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
		} else if (oUrl.query.type == "playlist") {
			ytsr.getFilters(search, function(err, filters) {
				filter = filters.get('Type').find(o => o.name === 'Playlist');
				var options = {
					limit: 100,
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
		} else if (!oUrl.query.type) {
			var options = {
				limit: 100
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
		}
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
		if (!oUrl.query.url) {
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
		var id = oUrl.query.url.substring(28);
		if (!oUrl.query.inst) {
			var bUrl = "https://invidio.us/"
		} else if (oUrl.query.inst == "snopyta") {
			var bUrl = "https://invidious.snopyta.org/"
		} else if (oUrl.query.inst == "13ad") {
			var bUrl = "https://invidious.13ad.de/"
		} else if (oUrl.query.inst == "ggc") {
			var bUrl = "https://invidious.ggc-project.de/"
		} else {
			var bUrl = "https://invidio.us/"
		}
		req(bUrl + "api/v1/videos/" + id, function (error, res, body) {
			if (!body) {
				var data = JSON.stringify({
					"err": "API error"
				})
				response.writeHead(404, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				})
				response.end(data);
			} else if (body.includes("<!DOCTYPE")) {
				var data = JSON.stringify({
					"err": "API error"
				})
				response.writeHead(404, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				})
				response.end(data);
			}
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
				if (!oUrl.query.pure == "1") {
					var j = JSON.parse(body);
					var viewCount = j.viewCount;
					var likeCount = j.likeCount;
					var dislikeCount = j.dislikeCount;
					var subCountTxt = j.subCountText;
					if (j.isListed == false) {
						var unlisted = true;
					} else {
						var unlisted = false;
					}
					var data = JSON.stringify({
						"meta": {
							"likeCount": likeCount,
							"dislikeCount": dislikeCount,
							"views": viewCount,
							"unlisted": unlisted,
							"subText": subCountTxt
						}
					})
					response.writeHead(200, {
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
		if (!oUrl.query.inst) {
			var bUrl = "https://invidio.us/"
		} else if (oUrl.query.inst == "snopyta") {
			var bUrl = "https://invidious.snopyta.org/"
		} else if (oUrl.query.inst == "13ad") {
			var bUrl = "https://invidious.13ad.de/"
		} else if (oUrl.query.inst == "ggc") {
			var bUrl = "https://invidious.ggc-project.de/"
		} else {
			var bUrl = "https://invidio.us/"
		}
		req(bUrl + "api/v1/channels/" + oUrl.query.channelId, function (error, res, body) {
			if (!body) {
				var data = JSON.stringify({
					"err": "API error"
				})
				response.writeHead(404, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				})
				response.end(data);
			} else if (body.includes("<!DOCTYPE")) {
				var data = JSON.stringify({
					"err": "API error"
				})
				response.writeHead(404, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				})
				response.end(data);
			}
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
		if (!oUrl.query.inst) {
			var bUrl = "https://invidio.us/"
		} else if (oUrl.query.inst == "snopyta") {
			var bUrl = "https://invidious.snopyta.org/"
		} else if (oUrl.query.inst == "13ad") {
			var bUrl = "https://invidious.13ad.de/"
		} else if (oUrl.query.inst == "ggc") {
			var bUrl = "https://invidious.ggc-project.de/"
		} else {
			var bUrl = "https://invidio.us/"
		}
		req(bUrl + "api/v1/channels/videos/" + oUrl.query.channelVideos + "/?sort_by=" + sort + "&page=" + page, function (error, res, body) {
			if (!body) {
				var data = JSON.stringify({
					"err": "API error"
				})
				response.writeHead(404, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				})
				response.end(data);
			} else if (body.includes("<!DOCTYPE")) {
				var data = JSON.stringify({
					"err": "API error"
				})
				response.writeHead(404, {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				})
				response.end(data);
			}
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

function getVidId(rUrl) {
	if (rUrl.includes("youtube.com/watch?v=") & rUrl.includes("https://")) {
		if (rUrl.includes("www.")) {
			return rUrl.substring(32,43)
		} else {
			if (rUrl.includes("m.youtube.com")) {
				return rUrl.substring(30,41)
			} else {
				return rUrl.substring(23,39)
			}
		}
	} else if (rUrl.includes("youtube.com/watch?v=") & rUrl.includes("http://")) {
		if (rUrl.includes("www.")) {
			return rUrl.substring(31,41)
		} else {
			if (rUrl.includes("m.youtube.com")) {
				return rUrl.substring(29,40)
			} else {
				return rUrl.substring(27,43)
			}
		}
	} else if (rUrl.includes("youtu.be")) {
		return rUrl.substring(17,28)
	}
}