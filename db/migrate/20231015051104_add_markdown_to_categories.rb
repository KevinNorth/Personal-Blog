# frozen_string_literal: true

class AddMarkdownToCategories < ActiveRecord::Migration[7.1]
  def change
    change_table :categories, bulk: true do |t|
      t.string :title
      t.string :subtitle
      t.string :summary
      t.text :markdown
      t.binary :header_image
    end
  end
end
