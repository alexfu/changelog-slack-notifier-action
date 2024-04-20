import { getInput } from '@actions/core';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline/promises';

// Inputs
const version = getInput('version');
const changelogFilePath = getInput('changelog_file_path');

// State
var consumeLine = false;
var result = [];

async function main() {
  const readStream = createReadStream(changelogFilePath);
  const readline = createInterface(readStream);

  readline.on('line', evaluateLine);

  readline.on('close', () => {
    console.log(result.join('\n').trim());
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
