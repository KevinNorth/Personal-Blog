# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: 'Fetches an object given its ID.' do
      argument :id, ID, required: true, description: 'ID of the object.'
    end

    field :nodes, [Types::NodeType, { null: true }], null: true,
                                                     description: 'Fetches a list of objects given a list of IDs.' do
      argument :ids, [ID], required: true, description: 'IDs of the objects.'
    end

    field :user, UserType, null: true, description: 'Fetches a user by ID' do
      argument :id, ID, required: true, description: 'ID to query'
    end

    field :user_by_login, UserType, null: true, description: 'Fetches a user by login' do
      argument :login, String, required: true, description: 'login to look up'
    end

    field :categories, [CategoryType], null: false, description: 'Fetches all Categories'

    field :posts_by_category, [PostType], null: true, description: 'Fetches all Posts that belong to a Category' do
      argument :category_id, ID, required: true, description: 'ID of the category to query'
    end

    field :post, PostType, null: true, description: 'Fetches a Post by ID' do
      argument :id, ID, required: true, description: 'ID to query'
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    def user(id:)
      User.find_by(id:)
    end

    def user_by_login(login:)
      User.find_by(login:)
    end

    def categories
      Category.all
    end

    def posts_by_category(category_id:)
      Post.where(category_id:)
    end

    def post(id:)
      Post.find_by(id:)
    end
  end
end
