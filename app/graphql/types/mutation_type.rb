# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_category, mutation: Mutations::CreateCategory, description: 'Creates a category'
    field :create_post, mutation: Mutations::CreatePost, description: 'Creates a post'
    field :delete_category_and_children,
          mutation: Mutations::DeleteCategoryAndChildren,
          description: 'Deletes a category, its posts, its children categories, and their children and posts'
    field :delete_post, mutation: Mutations::DeletePost, description: 'Deletes a post'
    field :update_category, mutation: Mutations::UpdateCategory, description: 'Updates a category'
    field :update_post, mutation: Mutations::UpdatePost, description: 'Updates a post'
  end
end
