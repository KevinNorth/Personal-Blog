# Borrowed from https://www.knowbe4.com/careers/blogs/engineering/railspostgresqldocker

FROM ruby:3.1.1-alpine3.15

RUN apk add --update build-base bash bash-completion libffi-dev tzdata postgresql-client postgresql-dev nodejs npm yarn

WORKDIR /app

COPY Gemfile* /app/

RUN gem install bundler

RUN bundle install

RUN bundle binstubs --all

RUN touch $HOME/.bashrc