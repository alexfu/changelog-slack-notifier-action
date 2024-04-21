import { Block, KnownBlock } from "@slack/types";
import { parseRichTextElement } from "./richTextElement";

interface BlockParser {
  regexp: RegExp;
  parse: (results: RegExpMatchArray) => KnownBlock[];
}

const parsers: BlockParser[] = [
  {
    regexp: /^### (.*)/,
    parse: (results) => {
      return [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*${results[1]}*`,
          },
        },
        {
          type: "divider",
        },
      ];
    },
  },
  {
    regexp: /^- (.*)/,
    parse: (results) => {
      const elements = parseRichTextElement(results[1]);
      return [
        {
          type: "rich_text",
          elements: [
            {
              type: "rich_text_list",
              style: "bullet",
              elements: [
                {
                  type: "rich_text_section",
                  elements: elements,
                },
              ],
            },
          ],
        },
      ];
    },
  },
];

export function parseBlock(line: string): Block[] {
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
