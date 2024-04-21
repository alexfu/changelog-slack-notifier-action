"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = void 0;
const web_api_1 = require("@slack/web-api");
function postMessage(blocks, token, channelId) {
    const client = new web_api_1.WebClient(token);
    return client.chat.postMessage({
        channel: channelId,
        blocks
    });
}
exports.postMessage = postMessage;
