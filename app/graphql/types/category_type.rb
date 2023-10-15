# frozen_string_literal: true

module Types
  class CategoryType < Types::BaseObject
    description 'A collection of posts, used to organize the nav header'

    field :children, [CategoryType],
          description: 'The children categories that appear nested under this one in the nav header'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false,
                                                        description: 'When this object was added to the database'
    field :id, ID, null: false, description: 'Unique database ID'
    field :name, String, description: 'Name as it should appear in the nav header'
    field :order, Integer,
          description: 'Order in which to show categories within nav header. Lowest number appears first.'
    field :parent, CategoryType,
          description: 'The parent category. nil if this category should appear at the top-level nav header.'
    field :posts, [PostType], description: 'The posts to show under this category'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false,
                                                        description: 'When this object was last updated in the database'
  end
end
