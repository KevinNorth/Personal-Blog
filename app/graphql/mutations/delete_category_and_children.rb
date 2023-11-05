# frozen_string_literal: true

module Mutations
  class DeleteCategoryAndChildren < BaseMutation
    description 'Deletes a category as well as all of its posts, its children categories, and their chlidren and posts'

    argument :id, ID, required: true, description: 'The ID of the category to delete'

    field :errors, [String], null: false,
                             description: 'If non-empty, contains descriptions of errors that prevented the mutation.'
    field :successful, Boolean, null: false, description: 'Indicates whether the deletion was performed'

    def resolve(id:)
      category = Category.find_by(id:)

      unless category
        return {
          successful: false,
          errors: ["Could not find category with ID #{id}"]
        }
      end

      category.destroy

      {
        successful: true,
        errors: []
      }
    end
  end
end
