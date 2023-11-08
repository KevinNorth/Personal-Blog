# frozen_string_literal: true

namespace :new_instance do
  desc 'Creates pages that the 404 page assumes exists'
  task create_initial_categories: :environment do
    Category.create!(
      markdown: 'Hello!',
      name: 'Home',
      order: 0,
      published: true,
      slug: 'home',
      subtitle: 'Welcome',
      summary: '-',
      title: 'Home',
      parent: nil
    )

    Category.create!(
      markdown: 'Contact me at:',
      name: 'Contact',
      order: 100,
      published: true,
      slug: 'contact',
      subtitle: "Let's chat!",
      summary: '-',
      title: 'Contact',
      parent: nil
    )
  end
end
