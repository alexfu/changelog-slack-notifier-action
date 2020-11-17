def format_commit_line(line):
    return "    • {}".format(line)

def format_commit_group(commit_group):
    name = commit_group.name
    commits = "\n".join(map(format_commit_line, commit_group.commits))
    emoji = get_emoji_for_commit_group(name)
    return "{} _{}_\n{}".format(emoji, name, commits)

def format(changelog):
    groups = []
    for commit_group in changelog.commit_groups:
        groups.append(format_commit_group(commit_group))
    return "\n\n".join(groups)

def get_emoji_for_commit_group(group_name):
    if group_name == "Bug Fixes":
        return "🐛"

    if group_name == "Code Refactoring":
        return "🛠"

    if group_name == "Chores":
        return "🧹"

    if group_name == "Features":
        return "✨"

    if group_name == "Performance Improvements":
        return "🚀"

    return ""
