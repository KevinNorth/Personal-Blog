# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# These might end up being similar to the categories and posts that appear on the live website,
# but of course, these are just dummy data that is dumped into local dev to make development
# more convenient. I figure that adding so much dummy data makes it easier for me to test
# different levels of nesting categories and categories with one post versus many.

user = User.create(
  admin: true,
  login: 'kevin',
  name: 'Kevin North'
)

categories = {}

categories[:home] = Category.create(name: 'Home', order: 1, parent: nil)
categories[:accomplishments] = Category.create(name: 'Accomplishments', order: 2, parent: nil)
categories[:about] = Category.create(name: 'About', order: 3, parent: nil)
categories[:contact] = Category.create(name: 'Contact', order: 4, parent: nil)

categories[:applied_systems] = Category.create(name: 'Applied Systems', order: 1, parent: categories[:accomplishments])
categories[:research] = Category.create(name: 'Research', order: 2, parent: categories[:accomplishments])
categories[:personal] = Category.create(name: 'Personal Projects', order: 3, parent: categories[:accomplishments])

categories[:epic_quotes] = Category.create(name: 'Epic Quotes', order: 1, parent: categories[:applied_systems])
categories[:applied_analytics] =
  Category.create(name: 'Applied Anaylitics', order: 2, parent: categories[:applied_systems])
categories[:commercial_lines] =
  Category.create(name: 'Commercial Lines', order: 3, parent: categories[:applied_systems])

categories[:website] = Category.create(name: 'kevinnorth.dev', order: 1, parent: categories[:personal])
categories[:lcdp] = Category.create(name: 'Lancaster County Democratic Party', order: 2, parent: categories[:personal])
categories[:unity] = Category.create(name: 'Unity game development', order: 3, parent: categories[:personal])

Post.create(
  title: 'Home',
  subtitle: "Give me a hard problem to solve and cut me loose. I'll make the impossible seem effortless.",
  summary: "Give me a hard problem to solve and cut me loose. I'll make the impossible seem effortless.",
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:home]
)

Post.create(
  title: 'Accomplishments',
  subtitle: 'No ordinary developer.',
  summary: 'A list of projects under my belt that go above and beyond what you would expect from a typical dev.',
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:accomplishments]
)

Post.create(
  title: 'Applied Systems',
  subtitle: 'Career Milestones',
  summary: 'Exceptional projects from my career.',
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:applied_systems]
)

Post.create(
  title: 'Epic Quotes',
  subtitle: 'A Ruby on Rails/React webapp',
  summary: 'A React and Rails app that I worked on from its inception to its long-term support phase.',
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:epic_quotes]
)

Post.create(
  title: 'Parent/Child Agency Refactoring',
  subtitle: 'Saving a Major Client',
  summary: "When we couldn't onboard a major client, I refactored our entire backend to keep them.",
  markdown: 'Lorem Ipsum',
  order: 2,
  author: user,
  category: categories[:epic_quotes]
)

Post.create(
  title: 'Copy Quote Algorithm',
  subtitle: 'Rails Metaprogramming and Graph Theory',
  summary: 'An algorithm I wrote uses the right kind of cleverness to require virtually no further maintenance.',
  markdown: 'Lorem Ipsum',
  order: 3,
  author: user,
  category: categories[:epic_quotes]
)

Post.create(
  title: 'Team Quarterback',
  subtitle: 'On time and under budget.',
  summary: 'I served as team lead for a critical six-month project.',
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:applied_analytics]
)

Post.create(
  title: 'Picking up GraphQL',
  subtitle: 'A new week, a new technology',
  summary: 'I created this website within two weeks of touching my first GraphQL.',
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:commercial_lines]
)

Post.create(
  title: 'GitVS',
  subtitle: 'A practical combination of Git, visualization, and music',
  summary: 'A tool to explore Git history that combines traditional visualizations with sound.',
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:research]
)

Post.create(
  title: 'Teaching Assistanceship',
  subtitle: 'Happy to help.',
  summary: 'One-on-one mentoring, weekly lectures, grading daily homework to tests to major projects.',
  markdown: 'Lorem Ipsum',
  order: 2,
  author: user,
  category: categories[:reserach]
)

Post.create(
  title: 'Presentation at ESEC/FSE 2015',
  subtitle: 'Public speaking is no problem.',
  summary: 'A presentation at a research conference in Italy.',
  markdown: 'Lorem Ipsum',
  order: 3,
  author: user,
  category: categories[:research]
)

Post.create(
  title: 'This Website',
  subtitle: "You're looking at it now.",
  summary: 'A webapp showcasing my ability with Rails, React, GraphQL, Apollo, and many other technologies',
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:website]
)

Post.create(
  title: 'Purchasing New Equipment',
  subtitle: 'Enabling democrats to get work done.',
  summary: 'Replacing decades-old computers with new laptops and tablets.',
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:lcdp]
)

Post.create(
  title: 'Security Training',
  subtitle: 'Doing my part to keep democracy safe.',
  summary: 'Provided security training to the board and other volunteers.',
  markdown: 'Lorem Ipsum',
  order: 2,
  author: user,
  category: categories[:lcdp]
)

Post.create(
  title: 'Your Hope is Unforgivable: a deckbuilding rougelike',
  subtitle: 'Smart design up-front for faster development later.',
  summary: 'Inspired by Redux, I built this game on a highly flexible state management architecture.',
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:unity]
)

Post.create(
  title: 'The Halting Problem: a rhythm game twin-stick shooter',
  subtitle: 'A potent integration of C# language features, Unity tooling, and third-party libraries.',
  summary: 'Digging deep into the source of third-party libraries I licensed, I built a combat system that ties everything to the music.',
  markdown: 'Lorem Ipsum',
  order: 2,
  author: user,
  category: categories[:unity]
)

Post.create(
  title: 'About Me',
  subtitle: 'A mind at home in complexity.',
  summary: 'Who I am.',
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:about]
)

Post.create(
  title: 'Contact',
  subtitle: "Let's chat!",
  summary: 'My contact information.',
  markdown: 'Lorem Ipsum',
  order: 1,
  author: user,
  category: categories[:contact]
)
