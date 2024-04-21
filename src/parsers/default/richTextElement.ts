import { RichTextElement } from "@slack/types";

interface RichTextElementParser {
  parse(line: string): RichTextElement[];
  test(line: string): boolean;
}

class TextWithLinkParser implements RichTextElementParser {
  regexp = /^(.*)\(\[(.*)\]\((.*)\)\)/;

  parse(line: string): RichTextElement[] {
    const result = line.match(this.regexp);
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
  }

  test(line: string): boolean {
    return this.regexp.test(line);
  }
}

const parsers: RichTextElementParser[] = [new TextWithLinkParser()];

export function parseRichTextElement(line: string): RichTextElement[] {
  if (line.length == 0) {
    return [];
  }

  for (const parser of parsers) {
    if (parser.test(line)) {
      return parser.parse(line);
    }
  }
  return [
    {
      type: "text",
      text: line,
    },
  ];
}
