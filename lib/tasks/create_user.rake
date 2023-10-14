desc "Creates a new user in the database"
task :create_user, [:name, :login, :is_admin] => :environment do |t, args|
    User.create(name: args[:name], login: args[:login], admin: (args[:is_admin] == "true"))
end