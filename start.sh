#!/bin/bash
# Start Jekyll development server

eval "$(rbenv init - zsh)"
bundle exec jekyll serve --livereload
