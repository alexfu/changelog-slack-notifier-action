# CHANGELOG Slack notifier GitHub action
A GitHub action to post a snippet of your projects CHANGELOG to a Slack channel.

## Requirements
- A CHANGELOG generated with [git-chglog](https://github.com/git-chglog/git-chglog)

## Usage
In your workflow file...

```
jobs:
  notify_with_changelog:
    name: Notify with CHANGELOG
    runs-on: ubuntu-latest
    steps:
      - name: CHANGELOG Slack notifier
        uses: alexfu/changelog-slack-notifier-action@v2
        with:
          title: "New version released!"
          version: v1.0.0
          changelog-file-path: ./CHANGELOG.md
          slack-token: xxxx
          slack-channel: xxxx
```
