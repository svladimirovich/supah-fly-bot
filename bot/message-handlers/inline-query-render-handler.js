var telegram = require("../../api/telegram");

var Handler = function() {};

const matchPattern = /kit\s\"([^\"]+)\"/;

Handler.prototype.canHandle = function(update) {
    console.log("in canHandle()" + JSON.stringify(update));
    
    if(update && update.inline_query) {
        if(matchPattern.test(update.inline_query.query)) {
            console.log(">> renderHandler can handle!");
            return true;
        }
    }
    return false;
};

Handler.prototype.handle = function(update) {
    
    // extract from bot inline query command text that we want to render
    let match = matchPattern.exec(update.inline_query.query);

    // url of an image with a rendered text
    let photo_url = `http://afternoon-everglades-97004.herokuapp.com/render/kit/${encodeURIComponent(match[1])}`;
    return telegram.answerInlineQuery(update.inline_query.id, JSON.stringify(
        [{
            type: "photo",
            id: String(10000000 + parseInt(Math.random() * 10000000)),
            photo_url: photo_url,
            thumb_url: photo_url
        }]
    ));
};

module.exports = Handler;
