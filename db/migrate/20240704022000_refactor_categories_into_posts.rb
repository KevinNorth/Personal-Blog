# frozen_string_literal: true

class RefactorCategoriesIntoPosts < ActiveRecord::Migration[7.1]
  def up
    ActiveRecord::Base.transaction do
      change_table :posts, bulk: true do |t|
        t.references :parent, null: true, foreign_key: { to_table: :posts }, index: true, default: nil
        t.string :name, null: false, default: ''
        t.boolean :was_category, null: false, default: false
        t.integer :previous_id_as_category, null: true, default: nil
        t.integer :previous_parent_id_as_category, null: true, default: nil
        t.integer :previous_order_as_category, null: true, default: true
        t.change(:category_id, :bigint, null: true, default: nil)
      end

      # First, create a post for each category...
      Category.find_each do |category|
        Post.create!(
          was_category: true,
          previous_id_as_category: category.id,
          previous_parent_id_as_category: category.parent_id,
          previous_order_as_category: category.order,
          markdown: category.markdown,
          name: category.name,
          published: category.published,
          order: Post.maximum(:order) + 1, # Giving all posts temporary, unique orders
          slug: category.slug,
          title: category.title,
          subtitle: category.subtitle,
          summary: category.summary,
          author: User.first,
          header_image: category.header_image
        )
      end

      # ...and then associate posts to each other based on how the old
      # categories were related...
      Category.find_each do |category| # rubocop:disable Style/CombinableLoops
        next unless category.parent

        new_post = Post.find_by(previous_id_as_category: category.id, was_category: true)
        new_parent = Post.find_by(previous_id_as_category: category.parent_id, was_category: true)
        new_post.parent = new_parent

        # Use original order if it can be guaranteed to be unique
        unless Post.exists?(parent: new_parent, order: new_post.previous_order_as_category)
          new_post.order = new_post.previous_order_as_category
        end

        new_post.save!
      end

      # ... and finally, we reassociate the pre-existing posts with the posts
      # that replaced their old categories
      Post.where.not(category: nil).find_each do |post|
        post.parent = Post.find_by(was_category: true, previous_id_as_category: post.category_id)
        post.category = nil
        post.save!
      end

      remove_index :posts, column: :category_id
      remove_index :categories, column: :parent_id
      drop_table :categories, force: :cascade
    end
  end

  def down
    ActiveRecord::Base.transaction do
      create_table :categories do |t|
        t.string :name
        t.integer :order
        t.references :parent,
                     null: true,
                     foreign_key: { to_table: :categories },
                     index: true
        t.string :title
        t.string :subtitle
        t.string :summary
        t.text :markdown
        t.binary :header_image
        t.string :slug, null: false
        t.boolean :published, default: false, null: false
        t.timestamps
      end

      # First, recreate the categories...
      Post.where(was_category: true).find_each do |post|
        new_category = Category.create(
          order: (Category.maximum(:order) || 0) + 1, # Giving all categories temporary, unique orders
          markdown: post.markdown,
          name: post.name,
          published: post.published,
          slug: post.slug,
          subtitle: post.subtitle,
          title: post.title,
          summary: post.summary,
          header_image: post.header_image
        )

        new_category.id = post.previous_id_as_category
        new_category.save!
      end

      # ... then, re-associate parent and child categories
      Post.where(was_category: true).where.not(previous_parent_id_as_category: nil).find_each do |post|
        new_category = Category.find(post.previous_id_as_category)
        new_parent = Category.find(post.previous_parent_id_as_category)
        new_category.parent = new_parent
        new_category.order = post.previous_order_as_category
        new_category.save!
      end
      Post.where(was_category: false).find_each do |post|
        new_parent_category = Category.find(post.parent.previous_id_as_category)
        post.category = new_parent_category
        post.parent = nil
        post.save!
      end

      Post.where(was_category: true).delete_all

      change_table :posts, bulk: true do |t|
        t.remove_references :parent
        t.remove :name
        t.remove :was_category
        t.remove :previous_id_as_category
        t.remove :previous_parent_id_as_category
        t.remove :previous_order_as_category
        t.change(:category_id, :bigint, null: false)
        t.index :category_id
      end
    end
  end
end
