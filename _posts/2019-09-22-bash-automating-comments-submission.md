---
layout: article
title: "Bash: Automating Comments Submission for a Static Site"
author: amith_raravi
excerpt: "Automate publishing of new comments submitted to your static site."
date: 2019-09-22 16:06:00 +0530
modified:
categories: [articles, tech]
image: images/automate.jpg
teaser: automate-400x250.jpg
---

A **Static Site** is awesome for bloggers. Easy to create (content), easy to maintain (website). And it allows you to tinker with your website design with just a bit of HTML/CSS know-how. The only issue with **Static Sites** is how to manage the comments section, as a bunch of static pages cannot handle form submission on their own.

![image]({{ site.imagekiturl }}{{ site.images }}automate.jpg)
<figcaption>Photo by <a href="https://unsplash.com/@franckinjapan">Franck V.</a> on  <a href="https://unsplash.com/s/photos/automation">Unsplash</a>.</figcaption>

But fear not, a bit of server-side scripting can solve it for you. The comments can be stored as individual files on the server, as I’ve mentioned in a [previous post]({{ site.url }}{% post_url 2018-11-01-adding-comments-to-a-static-site %}). After this, all I had to do was download the files on to my local machine and process them. In the beginning, I used to do it every week or so as the volume of comments was quite low. However, in the last six months, I’ve found that the increasing high influx of comments requires a daily check. Or, I will miss the genuine comments in the barrage of spam that hits my website every day.

---

## As It Is (or The Current System)

I finally found the time to automate comments submission on my [site](https://www.amithraravi.com). It’s been on my TODO list for so long that getting it done filled me with relief.

Let me give you a brief description of the setup I have so that you can better understand the automation performed.
1. A PHP script on my server picks up the comments received through form submission on my website.
2. The script processes the comment and saves it as a [YAML](https://yaml.org) file.
3. I log-in periodically and download all the comments to my local machine.
4. I check the downloaded comments and delete the spam ones. This remains to be a manual step.
5. For each valid comment, I will check the post it belongs to and add it to that particular post.
6. Build my website with the new comments.
7. Deploy the new build to the web server.

Out of these steps, Step 4 is a manual one for me. As a result, I have 2 scripts:
1. **Download comments**: A script to download comments and delete them from the server.
2. **Process Valid comments**: A script to move each valid script to its post folder, build the website with new comments and deploy it to the web server.

Even if you are eliminating spam at the web server side (using [Google Captcha](https://www.google.com/recaptcha/intro/v3.html) or something similar), there will be spam leftover for a human to moderate. I would suggest not to eliminate the manual check from your moderation process. <u>An attacker can design a handcrafted piece of code in a comment to wreak havoc on your web server.</u> If you’re feeling brave, you can go ahead and write a single script ignoring the manual verification.

---

## As It Should Be (or The Automated System)

I thought of BASH scripting to automate this process, as I usually have my MacBook Air with me wherever I go. I’m sure I will be using it for many more years to come!

#### Download Comments

To download comments, I used [rsync](https://linux.die.net/man/1/rsync) Linux command. If the `rsync` is successful, I delete the downloaded comments from the server. Here is a sample script.

```sh
#!/bin/bash

server="user@server.com"
src="/path/to/html/*.yml"
destination="/local/path/to/save/new/comments/"
```

This part declares the variables to be used.

```sh
rsync_command=$(rsync -a --progress "$server:$src" "$destination")
```

Execute the `rsync` command to download the comment YML files.

```sh
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
```

The above part will delete comment files from the server if the `rsync` command is successful.

```sh
else
    # Something went wrong!
    # This is hit when no files are found
    echo "No new comments. Or something went wrong."
    exit 1
fi

echo "Comment(s) moved."
```

The `else` part above will usually be run if there are no new comments. I say ‘usually’ because the `else` part is hit for any other errors as well. So it is better to keep logs of this part!

Once I run this script, I check all the comments downloaded onto my local machine and delete the spam. Now the remaining comments are ready to be processed by the next script.

#### Process Valid Comments

I will go through the script part by part, as before.

```sh
#!/bin/bash

search_dir="/Users/raravi/Programming/gitprojects/go/newcomments"
slug_line="slug: "
comments_dir="/Users/raravi/Programming/gitprojects/amithraravi2.com/_data/comments/"
no_of_files_processed=0
no_of_files_unprocessed=0
```

The variables are declared here.

```sh
# Get the list of all files
for file in "$search_dir"/*.yml
do
```

The `for` loop will process each comment file.

```sh
  if [[ "$file" = "$search_dir/*.yml" ]]
  then
    echo "No YML files found!"
    exit 0
  fi
```

If no files found, exit the loop. Else, move on.

```sh
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
```

The above part is specific to my code. I check if the comment file has a line starting with `slug: `. If it does, then it’s a valid comment. Else, move on to the next comment.

You can do processing specific to your comments in the above part!

```sh
  # Read each file
  while read line; do
    # read each line

    # check for slug line
    if [[ "$line" =~ "$slug_line" ]]
    then
      # get slug
      slug=$(echo "$line" | cut -d' ' -f 2)

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

      # Move the comment to the DIRECTORY
      mv "$file" "$comments_dir$slug"
      echo "  moved '$file'"
    fi
  done < "$file"
done
```

I check for `SLUG`, if it exists then I move the comment to its `post` folder. If the `post` folder doesn’t exist, then I create the `post` folder and then move the comment.

```sh
echo "YML Files: $no_of_files_processed processed, $no_of_files_unprocessed not processed."
```

This part gives information about the files that were processed (or not) by the script.

---

## BASH Scripting

BASH may feel a bit weird to look at, and I agree the syntax is quite unintuitive. But you will get used to it after a while. After you build a small script like this, you will understand how shells work and model your script based on it.

There’s a caveat to using BASH (or any shell) scripting. Any shell can elevate to root privileges without you, the developer, intending it. And one of the easiest ways to do that is not [quoting your variables](https://www.tldp.org/LDP/abs/html/quotingvar.html). Have a look at the [stack overflow thread](https://unix.stackexchange.com/questions/171346/security-implications-of-forgetting-to-quote-a-variable-in-bash-posix-shells), it’s worth the read.

I would suggest to run the BASH scripts from your terminal and never from outside your local machine. And this ties in with the manual verification step I’d talked about earlier. If the comment is not checked for spam, a carefully constructed piece of code can use your BASH script to attack your system!!

Use BASH responsibly, know the risks. It is quite powerful when used the right way.

---

I hope this post gave you enough information to automate your site! And Happy **BASH**ing :)
