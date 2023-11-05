# frozen_string_literal: true

module Mutations
  class CreateCategory < BaseMutation
    description 'Creates a new category'

    argument :category_attributes, Types::CategoryInputType, required: true, description: 'The category to create'

    field :category, Types::CategoryType, description: 'The category that was created. Null if there were errors.'
    field :errors, [String], null: false,
                             description: 'If non-empty, contains descriptions of errors that prevented the mutation.'

    def resolve(category_attributes:)
      category = Category.build(
        markdown: category_attributes.markdown,
        name: category_attributes.name,
        order: category_attributes.order,
        published: category_attributes.published,
        slug: category_attributes.slug,
        subtitle: category_attributes.subtitle,
        summary: category_attributes.summary,
        title: category_attributes.title,
        parent_id: category_attributes.parent_id
      )

      if category.save
        {
          category:,
          errors: []
        }
      else
        {
          category: nil,
          errors: category.errors.full_messages
        }
      end
    end
  end
end
