import { WebClient } from '@slack/web-api';
import { Block } from '@slack/types';

export function postMessage(blocks: Block[], token: string, channelId: string) {
  const client = new WebClient(token);
  return client.chat.postMessage({
    channel: channelId,
    blocks
  });
}
