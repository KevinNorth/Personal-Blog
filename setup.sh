#!/usr/bin/env bash

bundle install

bundle exec rake db:create
bundle exec rake db:schema:load
bundle exec rake db:schema:load RAILS_ENV=test
bundle exec rake db:seed

npm install -g yarn -v1.22.19
yarn install

bundle exec rails assets:precompile