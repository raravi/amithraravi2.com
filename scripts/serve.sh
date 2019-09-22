#!/bin/bash

bundle exec jekyll build
npm run webpack
npm run purgecss
bundle exec jekyll serve

echo "SERVE: jekyll build, webpack, purgecss & jekyll serve executed!"
