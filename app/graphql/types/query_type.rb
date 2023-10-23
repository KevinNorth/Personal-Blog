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

    field :categories, [CategoryType], null: false, description: 'Fetches all Categories' do
      argument :include_unpublished, Boolean,
               required: false,
               default_value: false,
               description: 'whether to include categories that have not yet been published'
    end

    field :category_by_id, [CategoryType], description: 'Fetches a category by its ID.' do
      argument :id, ID, required: true, description: 'ID to query'
      argument :include_unpublished, Boolean,
               required: false,
               default_value: false,
               description: 'whether to include categories that have not yet been published'
    end

    field :category_by_slug, CategoryType, description: 'Fetches a category by its URL slug.' do
      argument :include_unpublished, Boolean,
               required: false,
               default_value: false,
               description: 'whether to include categories that have not yet been published'
      argument :slug, String, required: true, description: 'the slug to look up'
    end

    field :posts_by_category, [PostType], null: true, description: 'Fetches all Posts that belong to a Category' do
      argument :category_id, ID, required: true, description: 'ID of the category to query'
      argument :include_unpublished, Boolean,
               required: false,
               default_value: false,
               description: 'whether to include categories and posts that have not yet been published'
    end

    field :post_by_id, PostType, null: true, description: 'Fetches a Post by ID' do
      argument :id, ID, required: true, description: 'ID to query'
      argument :include_unpublished, Boolean,
               required: false,
               default_value: false,
               description: 'whether to include categories and posts that have not yet been published'
    end

    field :post_by_slug, PostType, null: true, description: 'Fetches a Post by URL slug' do
      argument :category_slug, String, required: true, description: "the slug of the post's category"
      argument :include_unpublished, Boolean,
               required: false,
               default_value: false,
               description: 'whether to include categories and posts that have not yet been published'
      argument :post_slug, String, required: true, description: "the post's slug"
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

    def categories(include_unpublished:)
      if include_unpublished
        Category.all
      else
        Category.where(published: true)
      end
    end

    def category_by_id(id:, include_unpublished:)
      if include_unpublished
        Category.find_by(id:)
      else
        Category.where(published: true).find_by(id:)
      end
    end

    def category_by_slug(slug:, include_unpublished:)
      if include_unpublished
        Category.find_by(slug:)
      else
        Category.where(published: true).find_by(slug:)
      end
    end

    def posts_by_category(category_id:, include_unpublished:)
      if include_unpublished
        Post.joins(:category).where(category: { id: category_id })
      else
        Post.joins(:category).where(published: true, category: { id: category_id, published: true })
      end
    end

    def post_by_id(id:, include_unpublished:)
      if include_unpublished
        Post.find_by(id:)
      else
        Post.joins(:category).find_by(published: true, id:, category: { published: true })
      end
    end

    def post_by_slug(category_slug:, post_slug:, include_unpublished:)
      if include_unpublished
        Post.joins(:category).find_by(slug: post_slug, category: { slug: category_slug })
      else
        Post.joins(:category).find_by(published: true, slug: post_slug,
                                      category: { published: true, slug: category_slug })
      end
    end
  end
end
