import { describe, expect, it } from "@jest/globals";
import { parseRichTextElement } from "./richTextElement";

describe("parseRichTextElement", () => {
  it("returns correct RichTextElement", () => {
    const result = parseRichTextElement("hello world");
    expect(result).toStrictEqual([{ type: "text", text: "hello world" }]);
  });

  describe("when line contains a link", () => {
    it("returns correct RichTextElement", () => {
      const result = parseRichTextElement(
        "hello world ([link](https://www.google.com))",
      );
      expect(result).toStrictEqual([
        { type: "text", text: "hello world " },
        { type: "link", text: "(link)", url: "https://www.google.com" },
      ]);
    });
  });

  describe("when line is empty", () => {
    it("returns empty array", () => {
      const result = parseRichTextElement("");
      expect(result).toStrictEqual([]);
    });
  });
});
