FROM alpine:3.12

RUN apk add python3 curl git jq
RUN wget -O /usr/local/bin/git-chglog https://github.com/git-chglog/git-chglog/releases/download/0.9.1/git-chglog_linux_amd64
RUN chmod +x /usr/local/bin/git-chglog

COPY changelog_formatter /changelog_formatter
COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
