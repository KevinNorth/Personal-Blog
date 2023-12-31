#!/usr/bin/env bash
# exit on error
set -o errexit

npm install -g corepack
corepack enable

pnpm install

bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
