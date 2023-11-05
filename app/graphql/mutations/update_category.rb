# frozen_string_literal: true

module Mutations
  class UpdateCategory < BaseMutation
    description 'Updates an existing category'

    argument :category_attributes, Types::CategoryInputType, required: true, description: 'The category to update'
    argument :id, ID, required: true, description: 'The ID of the category to update'

    field :category, Types::CategoryType, description: 'The category that was updated. Null if there were errors.'
    field :errors, [String], null: false,
                             description: 'If non-empty, contains descriptions of errors that prevented the mutation.'

    def resolve(category_attributes:, id:)
      category = Category.find_by(id:)

      unless category
        return {
          category: nil,
          errors: ["Could not find category with ID #{id}"]
        }
      end

      category.assign_attributes(
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
