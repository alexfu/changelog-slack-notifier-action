import { getInput } from '@actions/core';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { postMessage } from './slack';

// Inputs
const version = getInput('version');
const changelogFilePath = getInput('changelog_file_path');
const slackToken = getInput('slack-token');
const slackChannel = getInput('slack-channel');

// State
var consumeLine = false;
var result = [];

async function main() {
  const readStream = createReadStream(changelogFilePath);
  const readline = createInterface(readStream);

  readline.on('line', evaluateLine);

  readline.on('close', async () => {
    const changelogSnippet = result.join('\n').trim();
    await postMessage(changelogSnippet, slackToken, slackChannel);
  });
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
