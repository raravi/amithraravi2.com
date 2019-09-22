#!/bin/bash

server="amithraravi.com@ssh.stackcp.com"
src="/home/sites/1a/8/89ee07bb2f/public_html/entry*.yml"
destination="/Users/raravi/Programming/gitprojects/go/newcomments/"

rsync_command=$(rsync -a --progress "$server:$src" "$destination" 2>/dev/null)

if [ $? -eq 0 ]; then
    # Success do some more work!

    if [ -n "${rsync_command}" ]; then
        # Stuff to run, because rsync has changes
        echo "$rsync_command"
        ssh "$server" "rm $src"
    else
        # No changes were made by rsync
        echo "No comments were copied! Check if you have copied the comments already.."
        exit 0
    fi
else
    # Something went wrong!
    # This is hit when no files are found
    echo "No new comments. Or something went wrong."
    exit 1
fi

echo "Comment(s) moved."