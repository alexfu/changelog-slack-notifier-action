import argparse
import changelog_parser
import changelog_formatter

argparser = argparse.ArgumentParser()
argparser.add_argument("file")
args = argparser.parse_args()

file = open(args.file, "r")
changelog = changelog_parser.parse(file)
if changelog:
    formatted_changelog = changelog_formatter.format(changelog)

    # Format message to print newline character and not actual newlines
    message = "{}".format(formatted_changelog.replace("\n", r"\n"))
    print(message)