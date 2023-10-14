# frozen_string_literal: true

module Types
  class CategoryType < Types::BaseObject
    description 'A collection of posts, used to organize the nav header'

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false,
                                                        description: 'When this object was added to the database'
    field :id, ID, null: false, description: 'Unique database ID'
    field :name, String, description: 'Name as it should appear in the nav header'
    field :order, Integer,
          description: 'Order in which to show categories within nav header. Lowest number appears first.'
    field :parent_id, Integer,
          description: 'ID of the parent category. nil if this category should appear at the top-level nav header.'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false,
                                                        description: 'When this object was last updated in the database'
  end
end
