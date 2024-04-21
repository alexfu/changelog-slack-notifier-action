import { RichTextElement } from "@slack/types";

interface RichTextElementParser {
  regexp: RegExp;
  parse: (result: RegExpMatchArray) => RichTextElement[];
}

const parsers: RichTextElementParser[] = [
  {
    regexp: /^(.*)\(\[(.*)\]\((.*)\)\)/,
    parse: (result) => {
      const text = result[1];
      const linkText = result[2];
      const linkUrl = result[3];
      return [
        {
          type: "text",
          text: text,
        },
        {
          type: "link",
          url: `${linkUrl}`,
          text: `(${linkText})`,
        },
      ];
    },
  },
];

export function parseRichTextElement(line: string): RichTextElement[] {
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
      type: "text",
      text: line,
    },
  ];
}
