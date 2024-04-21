"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChangelog = void 0;
const block_1 = require("./block");
function parseChangelog(changelog, title) {
    const blocks = getHeaderBlock(title);
    const lines = changelog.split('\n');
    lines.forEach((line) => {
        blocks.push(...(0, block_1.parseBlock)(line));
    });
    return blocks;
}
exports.parseChangelog = parseChangelog;
function getHeaderBlock(title) {
    const header = {
        type: 'header',
        text: {
            type: 'plain_text',
            text: title
        }
    };
    const subtext = {
        type: 'context',
        elements: [
            {
                type: 'plain_text',
                text: "Here's what's new in this release"
            }
        ]
    };
    return [header, subtext];
}
