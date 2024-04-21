import { beforeEach, describe, expect, it } from "@jest/globals";
import { parseBlock } from "./block";

describe("parseBlock", () => {
  let line: string;

  describe("when line is a subheader", () => {
    beforeEach(() => {
      line = "### Bug Fixes";
    });

    it("formats correctly", () => {
      const result = parseBlock(line);
      expect(result).toStrictEqual([
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Bug Fixes*",
          },
        },
        {
          type: "divider",
        },
      ]);
    });
  });

  describe("when line is a list items", () => {
    beforeEach(() => {
      line = "- Item 1";
    });

    it("formats correctly", () => {
      const result = parseBlock(line);
      expect(result).toStrictEqual([
        {
          type: "rich_text",
          elements: [
            {
              type: "rich_text_list",
              style: "bullet",
              elements: [
                {
                  type: "rich_text_section",
                  elements: [
                    {
                      type: "text",
                      text: "Item 1",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]);
    });
  });

  describe("when line is blank", () => {
    beforeEach(() => {
      line = "";
    });

    it("returns empty array", () => {
      const result = parseBlock(line);
      expect(result).toStrictEqual([]);
    });
  });
});
