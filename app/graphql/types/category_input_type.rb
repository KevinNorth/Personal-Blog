# frozen_string_literal: true

module Types
  class CategoryInputType < BaseInputObject
    description 'Attributes that need to be set to create or update a category'

    argument :markdown, String, required: true, description: "Contents of the category's page as Markdown"
    argument :name, String, required: true, description: 'Name as it should appear in the nav header'
    argument :order, Int,
             required: true,
             description: 'Order in which to show categories within nav header. Lowest number appears first.'
    argument :parent_id, ID,
             required: false,
             description: 'ID of the parent category. nil if this category should appear at the top-level nav header.'
    argument :published, Boolean, required: true,
                                  description: 'Whether this category should be visible to non-admin users'
    argument :slug, String, required: true, description: 'The slug to use in the URL to this category'
    argument :subtitle, String, required: true, description: "Subtitle on the category's page"
    argument :summary, String, required: true, description: "Summary to appear in list on parent category's page"
    argument :title, String, required: true, description: "Title on the header of the category's page"
  end
end
