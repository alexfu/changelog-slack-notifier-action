import type { Block, ContextBlock, HeaderBlock } from '@slack/types';
import { parseBlock } from './block';

export function parseChangelog(changelog: string, title: string): Block[] {
  const blocks = getHeaderBlock(title);
  const lines = changelog.split('\n');
  lines.forEach((line) => {
    blocks.push(...parseBlock(line));
  });
  return blocks;
}

function getHeaderBlock(title: string): Block[] {
  const header: HeaderBlock = {
    type: 'header',
    text: {
      type: 'plain_text',
      text: title
    }
  };

  const subtext: ContextBlock = {
    type: 'context',
    elements: [
      {
        type: 'plain_text',
        text: "Here's what's new in this release"
      }
    ]
  };

  return [header, subtext];
}
