# frozen_string_literal: true

module Mutations
  class CreatePost < BaseMutation
    description 'Creates a new post'

    argument :post_attributes, Types::PostInputType, required: true, description: 'The post to create'

    field :errors, [String], null: false,
                             description: 'If non-empty, contains descriptions of errors that prevented the mutation.'
    field :post, Types::PostType, description: 'The post that was created. Null if there were errors.'

    def resolve(post_attributes:)
      post = Post.build(
        author: context[:current_user],
        parent_id: post_attributes.parent_id,
        markdown: post_attributes.markdown,
        name: post_attributes.name,
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
