"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const node_fs_1 = require("node:fs");
const readline_1 = require("readline");
const slack_1 = require("./slack");
const default_1 = require("./parsers/default");
// Inputs
const title = (0, core_1.getInput)('title');
const version = (0, core_1.getInput)('version');
const changelogFilePath = (0, core_1.getInput)('changelog_file_path');
const slackToken = (0, core_1.getInput)('slack-token');
const slackChannel = (0, core_1.getInput)('slack-channel');
// State
let consumeLine = false;
const result = [];
async function main() {
    const readStream = (0, node_fs_1.createReadStream)(changelogFilePath);
    const readline = (0, readline_1.createInterface)(readStream);
    readline.on('line', evaluateLine);
    readline.on('close', postToSlack);
}
async function postToSlack() {
    const changelogSnippet = result.join('\n').trim();
    const blocks = (0, default_1.parseChangelog)(changelogSnippet, title);
    await (0, slack_1.postMessage)(blocks, slackToken, slackChannel);
}
function evaluateLine(line) {
    if (line.startsWith(`## [${version}] -`)) {
        // Begin consuming lines
        consumeLine = true;
    }
    else if (line.startsWith('<a name="')) {
        // End consuming lines
        consumeLine = false;
    }
    if (consumeLine) {
        result.push(line);
    }
}
main();
