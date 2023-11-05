# frozen_string_literal: true

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

# jsbundling-rails is hardcoded to use yarn as its JS package manager.
# I was having problems where yarn was causing my Docker containers to
# crash disaterously, so I wanted to switch to pnpm. Looking in the
# jsbundling-rails codebase, it looks like after the initial installation,
# some Rake tasks are the only bits that rely on yarn explicitly, so I'm
# replacing them with an implementation that uses pnpm instead.

Rake::Task['javascript:build'].clear
Rake::Task['javascript:install'].clear

desc 'Install JavaScript dependencies'
task 'javascript:build' do
  Rake::Task['jsbundling_monkeypatch:javascript:build'].invoke
end

desc 'Build your JavaScript bundle'
task 'javascript:install' do
  Rake::Task['jsbundling_monkeypatch:javascript:install'].invoke
end
