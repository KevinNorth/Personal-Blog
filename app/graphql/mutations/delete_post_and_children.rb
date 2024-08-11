# frozen_string_literal: true

module Mutations
  class DeletePostAndChildren < BaseMutation
    description 'Deletes a post, its children post, and their children and posts'

    argument :id, ID, required: true, description: 'The ID of the post to delete'

    field :errors, [String], null: false,
                             description: 'If non-empty, contains descriptions of errors that prevented the mutation.'
    field :successful, Boolean, null: false, description: 'Indicates whether the deletion was performed'

    def resolve(id:)
      post = Post.find_by(id:)

      unless post
        return {
          successful: false,
          errors: ["Could not find post with ID #{id}"]
        }
      end

      post.destroy

      {
        successful: true,
        errors: []
      }
    end
  end
end
