import re

class CommitGroup:
    def __init__(self, name):
        self.name = name
        self.commits = []

class Changelog:
    def __init__(self, version):
        self.version = version
        self.commit_groups = []

def version_header_match(line):
    return re.search("## \[(v\d+\.\d+\.\d+)\]", line)

def change_line_match(line):
    jira_commit_regex = "^- (.*)\(\[.*\]\(.*\)\)$"
    result = re.search(jira_commit_regex, line)
    if result:
        return result.group(1)

    standard_commit_regex = "^- (.*)$"
    result = re.search(standard_commit_regex, line)
    if result:
        return result.group(1)

def group_header_match(line):
    return re.search("### (.*)", line)

def process_line(line, changelog):
    group_header = group_header_match(line)
    if group_header:
        group_name = group_header.group(1)
        changelog.commit_groups.append(CommitGroup(group_name))
        return

    change_line = change_line_match(line)
    if change_line:
        last_commit_group = changelog.commit_groups[-1]
        last_commit_group.commits.append(change_line)
        return

def parse(changelog_file):
    changelog = None
    line = changelog_file.readline()
    while line != "":
        if not changelog:
            version_header = version_header_match(line)
            if version_header:
                version = version_header.group(1)
                changelog = Changelog(version)
        if changelog:
            process_line(line, changelog)
        line = changelog_file.readline()
    return changelog