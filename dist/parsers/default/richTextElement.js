"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRichTextElement = void 0;
;
const parsers = [
    {
        regexp: /^(.*)\(\[(.*)\]\((.*)\)\)/,
        parse: (result) => {
            const text = result[1];
            const linkText = result[2];
            const linkUrl = result[3];
            return [
                {
                    type: 'text',
                    text: text
                },
                {
                    type: 'link',
                    url: `${linkUrl}`,
                    text: `(${linkText})`
                }
            ];
        }
    }
];
function parseRichTextElement(line) {
    if (line.length == 0) {
        return [];
    }
    for (const parser of parsers) {
        if (parser.regexp.test(line)) {
            return parser.parse(line.match(parser.regexp));
        }
    }
    return [
        {
            type: 'text',
            text: line
        }
    ];
}
exports.parseRichTextElement = parseRichTextElement;
