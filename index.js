console.log("vidpolaris API")
console.log("booting up....")
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
let filter;
const fetchComments = require('youtube-comment-api')
const http = require('http'); 
const translate = require('@vitalets/google-translate-api');
const url = require('url');
const ytScraper = require("yt-scraper")
var ytpl = require('ytpl');
var fetchVideoInfo = require('youtube-info');
var youtubeSuggest = require('youtube-suggest')
http.createServer(onrequest).listen(process.env.PORT || 3000);
console.log("listening on port 3000")
console.log("============================")

function onrequest(request, response) {
	var oUrl = url.parse(request.url, true);
	
	if (!oUrl.query.url && !oUrl.query.search && !oUrl.query.suggest && !oUrl.query.playlistId && !oUrl.query.translate) {
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
	
	if (oUrl.query.video === "1") {
		var dUrl = oUrl.query.url;
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
			let aFormats = ytdl.filterFormats(info.formats, 'videoonly');
			var json = JSON.stringify ({
				datainfo: aFormats,
				info
			})
			response.writeHead(200, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json);
		})
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
	
	if (oUrl.query.audio === "1") {
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
		}
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
			let aFormats = ytdl.filterFormats(info.formats, 'audioonly');
			var json = JSON.stringify ({
				datainfo: aFormats,
				info
			})
			response.writeHead(200, {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			});
			response.end(json);
		})
		return;
	}
	
	if (oUrl.query.comments === "1") {
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
