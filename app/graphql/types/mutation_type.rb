# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_post, mutation: Mutations::CreatePost, description: 'Creates a post'
    field :delete_post_and_children,
          mutation: Mutations::DeletePostAndChildren,
          description: 'Deletes a post, its children post, and their children and posts'
    field :update_post, mutation: Mutations::UpdatePost, description: 'Updates a post'
  end
end
