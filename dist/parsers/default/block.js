"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBlock = void 0;
const richTextElement_1 = require("./richTextElement");
const parsers = [
    {
        regexp: /^### (.*)/,
        parse: (results) => {
            return [
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `*${results[1]}*`
                    }
                },
                {
                    type: 'divider'
                }
            ];
        }
    },
    {
        regexp: /^- (.*)/,
        parse: (results) => {
            const elements = (0, richTextElement_1.parseRichTextElement)(results[1]);
            return [
                {
                    type: 'rich_text',
                    elements: [
                        {
                            type: 'rich_text_list',
                            style: 'bullet',
                            elements: [
                                {
                                    type: 'rich_text_section',
                                    elements: elements
                                }
                            ]
                        }
                    ]
                }
            ];
        }
    },
];
function parseBlock(line) {
    if (line.length == 0) {
        return [];
    }
    for (const parser of parsers) {
        if (parser.regexp.test(line)) {
            return parser.parse(line.match(parser.regexp));
        }
    }
    return [];
}
exports.parseBlock = parseBlock;
