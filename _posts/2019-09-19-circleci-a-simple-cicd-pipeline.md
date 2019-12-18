---
layout: article
title: "CircleCI: A Simple CI/CD Pipeline for Your Static Site"
author: amith_raravi
excerpt: "Use CircleCI to build a CI/CD pipeline for deploying to a static site."
date: 2019-09-19 16:06:00 +0530
modified:
categories: [articles, tech]
image: images/cicd.jpg
teaser: cicd-400x250.jpg
---

For people who want to send their thoughts out into the world, a blog is the perfect medium of delivery. Although the maintenance of a blog feels easy in the beginning, as the content grows with time it becomes difficult to manage the process manually. When the blog hits critical mass, it becomes important to look at automating the maintenance process.

![image]({{ site.imagekiturl }}{{ site.images }}cicd.jpg)

This is where **CI/CD** tools come in. These tools will automate the testing and deployment stages in a fast and efficient manner.

---

Before we get into the nitty-gritty details, let me give you my use-case. My blog is a static site built using Jekyll. After adding content for over a year, the blog has grown large enough that changing one thing may break something else. For testing my builds, below are the high-level steps I wanted automated.

* On every commit to the `master` branch, take the code hosted on [my GitHub repository](https://github.com/raravi/amithraravi2.com) (repo in short).
* Run sanity checks to see there are no breaking changes.
* Deploy to my web server - hosted on a Linux hosted server.

The repetitive nature of this task made me realize that my blog had grown to a point where using a CI/CD pipeline started to make sense.

## What is CI/CD?

[Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) and [Continuous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery) and/or [Continuous Deployment](https://en.wikipedia.org/wiki/Continuous_deployment) is the practice of continuously merging all the developers’ code into a single codebase; for automated building, testing, and quicker delivery/deployment. In simple language, the code written by everyone in the team resides in a single place and is always delivery-ready, by running self-testing automated builds on each code check-in.

The CI/CD process places great importance on releasing software frequently. This will, in turn, lead to faster updates for the product, and a better experience for the user. Here is a [good CI/CD explainer](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment) from Atlassian.

**Continuous Delivery** ensures that the latest code is ready for deployment, by incorporating all the changes successfully up to the present time (e.g., Minor/Major Version releases).

If **Continuous Deployment** is part of the CI/CD pipeline, then the code is deployed automatically in short cycles (e.g., nightlies).

## CI/CD for individuals/blog-owners

I agree that the complete set of advantages offered by a dedicated CI/CD pipeline is a bit of overkill for us mere mortals. But then, all of us deserve a bit more of automation in our lives, don’t we?! With this spirit, I came up with the 3 steps that I would like to automate :)

A bit of googling (is this still a thing?!) revealed that a CI/CD pipeline using containers is the fastest way to automate the above requirement. Out of the various options available (the popular ones being [Jenkins](https://jenkins.io), [Travis CI](https://travis-ci.org), [CircleCI](https://www.circleci.com/‎), [Buddy](https://buddy.works), etc..), I zeroed in on **CircleCI**. **CircleCI** is currently offering free accounts for GitHub repo owners, as are a few others listed above.

## Enter CircleCI

Using the **CircleCI** platform, my requirement given above can be automated as follows:

* Create a separate `job` in the **CircleCI** pipeline to accomplish the step.
* Chain the 3 `job`s into a `workflow` so that there is a logical flow. Say `Job 1` -> `Job 2` -> `Job 3`. You may also specify the dependency between steps in the workflow, something like `Job 2` needs to wait for successful completion of  `Job 1`. Or, that `Job 3` will wait for `Job 1` and `Job 2` to complete.
* Specify the `trigger` condition for your workflow.

#### A simple CircleCI Job

```yml
  version: 2.1
  jobs:
    build:
      docker:
        - image: circleci/node:4.8.2 # the primary container, where your job's commands are run
      steps:
        - checkout # check out the code in the project directory
        - run: echo "hello world" # run the `echo` command
```

The above **CircleCI** configuration (saved in a CircleCI  `config.yml` file) lists a job called “build” which has 3 steps:

* It spins up a docker image for `node.js` platform. Think of this step as bringing up the `node.js` environment for program execution.
* Checks out code - from a GitHub repository that you’ve connected previously.
* Runs echo command inside the docker image.

A [Docker](https://en.wikipedia.org/wiki/Docker_(software)) image is a container that gives the required functionality/environment for running your code. For your project, the container will provide an easy way to install dependencies and run your code in an isolated environment. A container is not fully featured like a VM, but faster to bring up and run code. So it works great for testing individual code components!

#### A more complete example

```yml
jobs:
  build:
    docker:
      - image: circleci/<language>:<version TAG>
    steps:
      - checkout
      - run: <command>
  test:
    docker:
      - image: circleci/<language>:<version TAG>
    steps:
      - checkout
      - run: <command>
  deploy:
    docker:
      - image: circleci/<language>:<version TAG>
    steps:
      - checkout
      - run: <command>
workflows:
  version: 2
  build_and_test:
    jobs:
      - build
      - test
      - deploy:
          requires:
            - build
            - test
```

Now that you have seen jobs in action, it’s time to understand the next level: `workflow`s. A workflow allows you to define the logical sequence of the individual jobs, complete with dependencies between each. In the above example, the `build` and `test` jobs run in parallel and once both of them complete successfully, the `deploy` job is run.

## Use CircleCI to push changes to your blog

If your website code resides on GitHub, you can connect it to CircleCI and start watching your GitHub repo for commits.

The only thing required is to add the below file to your repo.

```
.circleci/config.yml
```

The `config.yml` file contains the configuration required by `CircleCI` for the jobs/workflows to be run! And you can keep the `config.yml` as part of your build. Pretty nifty, right?!

Next up, is to build your website inside the docker image. My website is built on `Jekyll` in a `Ruby` environment. So, I will launch a ruby docker image and build my website in it.

The `build` job is given below

```yml
jobs:
  build:
    <<: *defaults
    docker:
      - image: circleci/ruby:2.5
    environment:
      BUNDLE_PATH: ~/repo/vendor/bundle
    steps:
      - checkout
      - run:
          name: Bundle Install
          command: bundle check || bundle install
      - run:
          name: Jekyll build
          command: bundle exec jekyll build
```

The next step is to run a sanity check on the website, to check if it’s running fine. HTMLProofer checks to see if your rendered website works as intended, and that’s what I use. After this, we will save the website (in the `_site` folder) to be used for deploying in the next job.

```yml
      - run:
          name: HTMLProofer tests
          command: |
            bundle exec htmlproofer ./_site \
              --allow-hash-href \
              --check-favicon  \
              --check-html \
              --disable-external
      - persist_to_workspace:
          root: ./
          paths:
            - _site
```

The `deploy` job will first get the data saved from the previous job. Then, it uses the [rsync](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps) Linux command to sync the `_site` folder contents to the web server.

`rsync` command does the following:
* --delete flag: delete the contents in the Destination folder that doesn’t match the contents of Source folder (`_site`).
* --exclude flag: excludes the file/folder on the Destination side from deletion.
* The file/folders to be copied, or only copied if they’ve been modified in any way. And only the modified part is copied, not the entire file!

```yml
  deploy:
    machine:
      enabled: true
    steps:
      - attach_workspace:
          at: ./
      - run:
          name: Deploy _site Over SSH
          command: |
            rsync -a --progress --delete _site/ user@server.com:/DEST/public_html/ --exclude=/.git/ --exclude=/cgi-bin/ --exclude=/.gitignore
```

Well, that’s it! Now, make some changes and commit them to your GitHub repo. And watch the **CircleCI** workflow take over. It took me just a day (and a bit of night :) ) to automate this. Who knows, you may do it in a shorter time.

Even though I have used **CircleCI** here, you can use any other **CI/CD** solution that is out there. It will follow a similar approach to what is described here. Go ahead and dabble a bit!

Note: _The cover photo is by [JJ Ying](https://unsplash.com/@jjying) on [Unsplash](https://unsplash.com)!_
