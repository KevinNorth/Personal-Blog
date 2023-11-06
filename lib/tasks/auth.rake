# frozen_string_literal: true

namespace :auth do
  desc 'Creates a new user in the database'
  task :create_user, %i[name login] => :environment do |_t, args|
    $stdout.puts 'Enter new password:'
    password = $stdin.gets
    User.create(name: args[:name], login: args[:login], password:, password_confirmation: password)
  end

  desc "Changes a user's password"
  task :change_password_for_user, %i[login] => :environment do |_t, args|
    user = User.find_by(login: args[:login])

    unless user
      $stdout.puts "Could not find user with username #{args[:login]}"
      return
    end

    $stdout.puts 'Enter new password:'
    password = $stdin.gets.chomp
    user.update(password:, password_confirmation: password)
  end
end
