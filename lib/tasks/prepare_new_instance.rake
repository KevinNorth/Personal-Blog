# frozen_string_literal: true

namespace :new_instance do
  desc 'Creates pages that the 404 page assumes exists'
  task create_initial_posts: :environment do
    raise 'Create a user before running this task' unless User.exists?

    Post.create!(
      markdown: 'Hello!',
      name: 'Home',
      order: 0,
      published: true,
      slug: 'home',
      subtitle: 'Welcome',
      summary: '-',
      title: 'Home',
      parent: nil,
      author: User.first
    )

    Post.create!(
      markdown: 'Contact me at:',
      name: 'Contact',
      order: 100,
      published: true,
      slug: 'contact',
      subtitle: "Let's chat!",
      summary: '-',
      title: 'Contact',
      parent: nil,
      author: User.first
    )
  end
end
