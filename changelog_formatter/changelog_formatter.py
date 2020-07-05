def format_commit_line(line):
    return "    • {}".format(line)

def format_commit_group(commit_group):
    name = commit_group.name
    commits = "\n".join(map(format_commit_line, commit_group.commits))
    return "_{}_\n{}".format(name, commits)

def format(changelog):
    groups = []
    for commit_group in changelog.commit_groups:
        groups.append(format_commit_group(commit_group))
    return "\n\n".join(groups)