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
    field :published, Boolean, description: 'Whether this post should be visible to non-admin users'
    field :slug, String, null: false, description: 'The slug to use in the URL to this post'
    field :subtitle, String, description: 'Subtitle of the post'
    field :summary, String, description: 'Summary to appear in list on category page'
    field :title, String, description: 'Title of the post'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false,
                                                        description: 'When this object was last updated in the database'

    def header_image
      nil
    end
  end
end
