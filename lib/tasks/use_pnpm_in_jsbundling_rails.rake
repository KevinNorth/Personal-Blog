# frozen_string_literal: true

# jsbundling-rails is hardcoded to use yarn as its JS package manager.
# I was having problems where yarn was causing my Docker containers to
# crash disaterously, so I wanted to switch to pnpm. Looking in the
# jsbundling-rails codebase, it looks like after the initial installation,
# some Rake tasks are the only bits that rely on yarn explicitly, so I'm
# replacing them with an implementation that uses pnpm instead.

namespace :jsbundling_monkeypatch do
  namespace :javascript do
    desc 'Install JavaScript dependencies'
    task :install do
      command = JsbundlingMonkeypatch::Tasks.install_command
      unless system(command)
        raise "jsbundling-rails: Command install failed, ensure #{command.split.first} is installed"
      end
    end

    desc 'Build your JavaScript bundle'
    build_task = task :build do
      command = JsbundlingMonkeypatch::Tasks.build_command

      raise "jsbundling-rails: Command build failed, ensure `#{command}` runs without errors" unless system(command)
    end

    unless ENV['SKIP_YARN_INSTALL'] || ENV['SKIP_BUN_INSTALL'] || ENV['SKIP_PNPM_INSTALL']
      build_task.prereqs << :install
    end
  end
end

module JsbundlingMonkeypatch
  module Tasks
    def install_command
      return 'pnpm install' if File.exist?('pnpm-lock.yaml') || tool_exists?('pnpm')

      raise 'jsbundling-rails: No suitable tool found for installing JavaScript dependencies'
    end

    def build_command
      return 'pnpm run build' if File.exist?('pnpm-lock.yaml') || tool_exists?('pnpm')

      raise 'jsbundling-rails: No suitable tool found for building JavaScript'
    end

    def tool_exists?(tool)
      system "command -v #{tool} > /dev/null"
    end

    module_function :install_command, :build_command, :tool_exists?
  end
end

unless ENV['SKIP_JS_BUILD']
  Rake::Task['assets:precompile'].enhance(['javascript:build']) if Rake::Task.task_defined?('assets:precompile')

  if Rake::Task.task_defined?('test:prepare')
    Rake::Task['test:prepare'].enhance(['javascript:build'])
  elsif Rake::Task.task_defined?('spec:prepare')
    Rake::Task['spec:prepare'].enhance(['javascript:build'])
  elsif Rake::Task.task_defined?('db:test:prepare')
    Rake::Task['db:test:prepare'].enhance(['javascript:build'])
  end
end
