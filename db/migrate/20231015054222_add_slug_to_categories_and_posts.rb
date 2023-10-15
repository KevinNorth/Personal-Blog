# frozen_string_literal: true

class AddSlugToCategoriesAndPosts < ActiveRecord::Migration[7.1]
  def change
    change_table :categories, bulk: true do |t|
      t.string :slug, null: true
    end

    change_table :posts, bulk: true do |t|
      t.string :slug, null: true
    end

    reversible do |direction|
      direction.up do
        Category.find_each do |category|
          category.slug = category.name.gsub(/\s+/, '-').downcase
          category.save!
        end

        Post.find_each do |post|
          post.slug = post.title.gsub(/\s+/, '-').downcase
          post.save!
        end
      end

      direction.down do
        # No need to update values, the columns we are interested in are being dropped
      end
    end

    change_table :categories, bulk: true do |t|
      t.change_null :slug, false
    end

    change_table :posts, bulk: true do |t|
      t.change_null :slug, false
    end
  end
end
