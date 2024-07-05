# frozen_string_literal: true

module Types
  class PostInputType < BaseInputObject
    description 'Attributes that need to be set to create or update a post]'

    argument :markdown, String, required: true, description: 'Contents of the post as Markdown'
    argument :order, Int, required: true,
                          description: 'Order in which to show posts within a category. Lowest number appears first.'
    argument :parent_id, ID, required: false,
                             description: "ID of the post under which this post will appear. Null if it's a top-level post."
    argument :published, Boolean, required: true, description: 'Whether this post should be visible to non-admin users'
    argument :slug, String, required: true, description: 'The slug to use in the URL to this post'
    argument :subtitle, String, required: true, description: 'Subtitle of the post'
    argument :summary, String, required: true, description: 'Summary to appear in list on category page'
    argument :title, String, required: true, description: 'Title of the post'
  end
end
