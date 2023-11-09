#!/usr/bin/env bash
# exit on error
set -o errexit

mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
echo "export PATH=\"$PATH\"" >> .bashrc

npm install -g corepack
corepack enable
corepack prepare pnpm@latest --activate
npm install -g pnpm

pnpm install

bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
