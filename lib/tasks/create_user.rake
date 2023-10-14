# frozen_string_literal: true

desc 'Creates a new user in the database'
task :create_user, %i[name login is_admin] => :environment do |_t, args|
  User.create(name: args[:name], login: args[:login], admin: (args[:is_admin] == 'true'))
end
