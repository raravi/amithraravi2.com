#!/bin/bash

search_dir="/Users/raravi/Programming/gitprojects/go/newcomments"
slug_line="slug: "
comments_dir="/Users/raravi/Programming/gitprojects/amithraravi2.com/_data/comments/"
no_of_files_processed=0
no_of_files_unprocessed=0

# Get the list of all files
for file in "$search_dir"/*.yml
do
  if [[ "$file" = "$search_dir/*.yml" ]]
  then
    echo "No YML files found!"
    exit 0
  fi

  # Check if file has a SLUG
  echo "FILE: $file"
  if grep -q "slug: *" "$file";
  then
    echo "  has slug, continue processing.."
    no_of_files_processed=$((no_of_files_processed+1))
  else
    echo "  doesn't have a slug!"
    no_of_files_unprocessed=$((no_of_files_unprocessed+1))
    continue
  fi

  # TODO: Replacing with "\r\n\r\n" \ "  \r\n"
  # while read -r line; do
  #   [[ ! "$line" = "" ]] && echo "$line"
  # done < "$file" > o
  # mv o "$file"

  # DEBUG: n=1

  # Read each file
  while read line; do
    # read each line
    # DEBUG: echo "Line No. $n : $line"

    # check for slug line
    if [[ "$line" =~ "$slug_line" ]]
    then
      # get slug
      slug=$(echo "$line" | cut -d' ' -f 2)
      echo "  slug: $slug"

      # check for directory
      if [ -d "$comments_dir$slug" ];
      then
        # Take action if DIRECTORY exists. #
        echo "  '$slug' folder exists..."
      else
        # Doesnt exist, create dir
        echo "  '$slug' folder doesn't exist. creating.."

        # Create directory
        mkdir "$comments_dir$slug"
        echo "  created folder '$slug'"
      fi

      # Remove slug from comment
      # sed -i '' '/slug: */d' $entry

      # Move the comment to the DIRECTORY
      mv "$file" "$comments_dir$slug"
      echo "  moved '$file'"
    fi
    # DEBUG: n=$((n+1))
  done < "$file"
done

echo "YML Files: $no_of_files_processed processed, $no_of_files_unprocessed not processed."
