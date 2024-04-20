import { WebClient } from '@slack/web-api';

export function postMessage(message: string, token: string, channelId: string) {
  const client = new WebClient(token);
  return client.chat.postMessage({
    text: message,
    channel: channelId
  });
}
