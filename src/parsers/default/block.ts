import { Block, KnownBlock } from "@slack/types";
import { parseRichTextElement } from "./richTextElement";

interface BlockParser {
  parse(line: string): KnownBlock[];
  test(line: string): boolean;
}

class SubHeaderBlockParser implements BlockParser {
  regexp = /^### (.*)/;

  parse(line: string): KnownBlock[] {
    const results = line.match(this.regexp);
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
  }

  test(line: string): boolean {
    return this.regexp.test(line);
  }
}

class ListItemBlockParser implements BlockParser {
  regexp = /^- (.*)/;

  parse(line: string): KnownBlock[] {
    const results = line.match(this.regexp);
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
  }

  test(line: string): boolean {
    return this.regexp.test(line);
  }
}

const parsers: BlockParser[] = [
  new SubHeaderBlockParser(),
  new ListItemBlockParser(),
];

export function parseBlock(line: string): Block[] {
  if (line.length == 0) {
    return [];
  }

  for (const parser of parsers) {
    if (parser.test(line)) {
      return parser.parse(line);
    }
  }

  return [];
}
