#!/usr/bin/env bash

bundle install

bundle exec rake db:create
bundle exec rake db:schema:load
bundle exec rake db:schema:load RAILS_ENV=test
bundle exec rake db:seed

npm install -g corepack
corepack enable
corepack prepare pnpm@latest --activate
npm install -g pnpm

pnpm install

bundle exec rails assets:precompile
