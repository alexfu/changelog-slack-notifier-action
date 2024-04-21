import { getInput } from "@actions/core";
import { createReadStream } from "node:fs";
import { createInterface } from "readline";
import { postMessage } from "./slack";
import { parseChangelog } from "./parsers/default";

// Inputs
const title = getInput("title");
const version = getInput("version");
const changelogFilePath = getInput("changelog-file-path");
const slackToken = getInput("slack-token");
const slackChannel = getInput("slack-channel");

// State
let consumeLine = false;
const result: string[] = [];

async function main() {
  const readStream = createReadStream(changelogFilePath);
  const readline = createInterface(readStream);

  readline.on("line", evaluateLine);
  readline.on("close", postToSlack);
}

async function postToSlack() {
  const changelogSnippet = result.join("\n").trim();
  const blocks = parseChangelog(changelogSnippet, title);
  await postMessage(blocks, slackToken, slackChannel);
}

function evaluateLine(line: string) {
  if (line.startsWith(`## [${version}] -`)) {
    // Begin consuming lines
    consumeLine = true;
  } else if (line.startsWith('<a name="')) {
    // End consuming lines
    consumeLine = false;
  }

  if (consumeLine) {
    result.push(line);
  }
}

main();
