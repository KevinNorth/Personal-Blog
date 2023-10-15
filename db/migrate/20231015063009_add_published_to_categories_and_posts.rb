# frozen_string_literal: true

class AddPublishedToCategoriesAndPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :categories, :published, :boolean, null: false, default: false
    add_column :posts, :published, :boolean, null: false, default: false
  end
end
