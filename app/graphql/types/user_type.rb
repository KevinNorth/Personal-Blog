# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    description 'A user who maintains the website'

    field :admin, Boolean, null: false, description: 'Whether this user can write posts'
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false,
                                                        description: 'When this object was added to the database'
    field :id, ID, null: false, description: 'Unique database ID'
    field :login, String, description: 'Username used for logging in'
    field :name, String, description: 'Full name as it should appear under posts'
    field :posts, [PostType], description: 'The posts created by this user'
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false,
                                                        description: 'When this object was last updated in the database'
  end
end
