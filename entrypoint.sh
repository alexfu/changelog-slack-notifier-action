#!/bin/sh -l
ENTRYPOINT_PATH=$(dirname $0)

TITLE=$1
VERSION=$2
SLACK_TOKEN=$3
SLACK_CHANNEL=$4

git-chglog -o CHANGELOG.tmp.md $VERSION

# Reformat CHANGELOG as a Slack message
CHANGELOG=$(python3 $ENTRYPOINT_PATH/changelog_formatter/main.py CHANGELOG.tmp.md)

# Post to Slack
JSON_BODY="
{
  \"channel\": \"$SLACK_CHANNEL\",
  \"blocks\": [
    {\"type\": \"section\",\"text\": {\"type\": \"mrkdwn\", \"text\": \"*$TITLE*\"}},
    {\"type\": \"section\", \"text\": {\"type\": \"mrkdwn\", \"text\": \"*Here's what's new in this release*\"}},
    {\"type\": \"divider\"},
    {\"type\": \"section\", \"text\": {\"type\": \"mrkdwn\", \"text\": \"$CHANGELOG\"}}
   ]
}
"

# Compact JSON
JSON_BODY=$(echo "$JSON_BODY" | jq -c)

curl -X POST https://slack.com/api/chat.postMessage \
    -H "Authorization: Bearer $SLACK_TOKEN" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "$JSON_BODY"