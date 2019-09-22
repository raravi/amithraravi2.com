#!/bin/bash

bundle exec jekyll build
npm run webpack
npm run purgecss
bundle exec jekyll build

echo "BUILD: jekyll build, webpack, purgecss & jekyll build executed!"
