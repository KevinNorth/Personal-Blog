#!/usr/bin/env bash

bundle install

bundle exec rake db:create
bundle exec rake db:schema:load
bundle exec rake db:schema:load RAILS_ENV=test