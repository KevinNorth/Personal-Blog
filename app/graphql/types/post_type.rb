# frozen_string_literal: true

module Types
  class PostType < Types::BaseObject
    description 'A blog post'

    field :author, UserType, null: false, description: 'The user who wrote the post'
    field :category, CategoryType, null: false, description: 'The category under which this post will appear'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false,
                                                        description: 'When this object was added to the database'
    field :header_image, String, description: 'URL of image to show at the top of the page'
    field :id, ID, null: false, description: 'Unique database ID'
    field :markdown, String, description: 'Contents of the post as Markdown'
    field :order, Integer, description: 'Order in which to show posts within a category. Lowest number appears first.'
    field :subtitle, String, description: 'Subtitle of the post'
    field :summary, String, description: 'Summary to appear in list on category page'
    field :title, String, description: 'Subtitle of the post'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false,
                                                        description: 'When this object was last updated in the database'
  end
end
