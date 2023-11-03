# frozen_string_literal: true

module Mutations
  class UpdatePost < BaseMutation
    description 'Updates an existing post'

    argument :id, ID, required: true, description: 'The ID of the post to update'
    argument :post_attributes, Types::PostInputType, required: true, description: 'The post to update'

    field :errors, [String], null: false,
                             description: 'If non-empty, contains descriptions of errors that prevented the mutation.'
    field :post, Types::PostType, description: 'The post that was updated. Null if there were errors.'

    def resolve(id:, post_attributes:)
      post = Post.find_by(id:)

      unless post
        return {
          post: nil,
          errors: ["Could not find post with ID #{id}"]
        }
      end

      post.assign_attributes(
        category_id: post_attributes.category_id,
        markdown: post_attributes.markdown,
        order: post_attributes.order,
        published: post_attributes.published,
        slug: post_attributes.slug,
        subtitle: post_attributes.subtitle,
        summary: post_attributes.summary,
        title: post_attributes.title
      )

      if post.save
        {
          post:,
          errors: []
        }
      else
        {
          post: nil,
          errors: post.errors.full_messages
        }
      end
    end
  end
end
