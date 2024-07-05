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

    field :user_by_id, UserType, null: true, description: 'Fetches a user by ID' do
      argument :id, ID, required: true, description: 'ID to query'
    end

    field :user_by_login, UserType, null: true, description: 'Fetches a user by login' do
      argument :login, String, required: true, description: 'login to look up'
    end

    field :post_by_slug, PostType, description: 'Fetches a post by its URL slug.' do
      argument :include_unpublished, Boolean,
               required: false,
               default_value: false,
               description: 'whether to include posts that have not yet been published',
               require_logged_in: true
      argument :slug, String, required: true, description: 'the slug to look up'
    end

    field :post_by_parent_and_own_slug, PostType, null: true, description: "Fetches a Post by combining its URL slug and its parent's URL slug" do
      argument :parent_slug, String, required: true, description: "the slug of the post's parent"
      argument :include_unpublished, Boolean,
               required: false,
               default_value: false,
               description: 'whether to include posts that have not yet been published',
               require_logged_in: true
      argument :post_slug, String, required: true, description: "the post's slug"
    end

    field :posts_by_parent, [PostType], null: true, description: 'Fetches all Posts that belong to a parent Post' do
      argument :post_id, ID, required: true, description: 'ID of the post to query'
      argument :include_unpublished, Boolean,
               required: false,
               default_value: false,
               description: 'whether to include posts that have not yet been published',
               require_logged_in: true
    end

    field :post_by_id, PostType, null: true, description: 'Fetches a Post by ID' do
      argument :id, ID, required: true, description: 'ID to query'
      argument :include_unpublished, Boolean,
               required: false,
               default_value: false,
               description: 'whether to include categories and posts that have not yet been published',
               require_logged_in: true
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    def user_by_id(id:)
      User.find_by(id:)
    end

    def user_by_login(login:)
      User.find_by(login:)
    end

    def parent(parent_id:, include_unpublished:)
      if include_unpublished
        Post.joins(:parent).where(parent: { id: parent_id })
      else
        Post.joins(:parent).where(published: true, parent: { id: parent_id, published: true })
      end
    end

    def post_by_id(id:, include_unpublished:)
      if include_unpublished
        Post.find_by(id:)
      else
        Post.joins(:category).find_by(published: true, id:, category: { published: true })
      end
    end

    def post_by_slug(slug:, include_unpublished:)
      if include_unpublished
        Post.find_by(slug:)
      else
        Post.eager_load(:children).joins('AND children.published = true').find_by(slug:, published: true)
      end
    end

    def post_by_parent_and_own_slug(parent_slug:, post_slug:, include_unpublished:)
      if include_unpublished
        Post.joins(:parent).find_by(slug: post_slug, parent: { slug: parent_slug })
      else
        Post.joins(:parent).find_by(published: true, slug: post_slug,
                                      parent: { published: true, slug: parent_slug })
      end
    end
  end
end
