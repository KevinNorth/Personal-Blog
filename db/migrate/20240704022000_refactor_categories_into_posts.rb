# frozen_string_literal: true

class RefactorCategoriesIntoPosts < ActiveRecord::Migration[7.1]
  def up
    change_table :posts, bulk: true do |t|
      t.references :parent, null: true, foreign_key: { to_table: :posts }, index: true, default: nil
      t.string :name, null: false, default: ''
      t.boolean :was_category, null: false, default: false
      t.integer :previous_id_as_category, null: true, default: nil
      t.integer :previous_parent_id_as_category, null: true, default: nil
      t.integer :previous_order_as_category, null: true, default: true
    end

    # First, create a post for each category...
    Category.find_each do |category|
      Post.create(
        was_category: true,
        previous_id_as_category: category.id,
        previous_parent_id_as_category: category.parent_id,
        previous_order_as_category: category.order,
        markdown: category.markdown,
        name: category.name,
        published: category.published,
        order: category.order,
        slug: category.slug,
        subtitle: category.subtitle,
        summary: category.summary,
        author: User.first,
        header_image: category.header_image
      )
    end

    # ...and then associate posts to each other based on how the old
    # categories were related
    Category.find_each do |category| # rubocop:disable Style/CombinableLoops
      next unless category.parent

      new_post = Post.find_by(previous_id_as_category: category.id, was_category: true)
      new_parent = Post.find_by(previous_id_as_category: category.parent_id, was_category: true)
      new_post.parent = new_parent

      # Ensure that all posts have unique orders
      if Post.exists?(was_category: true, parent: new_parent, order: new_post.order)
        new_post.order = Post.where(was_category: true, parent: new_parent).maximum(:order)
      end

      new_post.save!
    end

    drop_table :categories
  end

  def down
    create_table :categories, bulk: true do |t|
      t.string :name
      t.integer :order
      t.references :parent_id, null: true, foreign_key: { to_table: :categories }, index: true, default: nil
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
      Category.create(
        id: post.previous_id_as_category,
        order: post.previous_order_as_category,
        markdown: post.markdown,
        name: post.name,
        published: post.published,
        slug: post.slug,
        subtitle: post.subtitle,
        summary: post.summary,
        header_image: post.header_image
      )
    end

    # ... then, re-associate parent and child categories
    Post.where(was_category: true).not.where(previous_parent_id_as_category: nil).find_each do |post|
      new_category = Category.find(post.previous_id_as_category)
      new_parent = Category.find(post.previous_parent_id_as_category)
      new_category.parent = new_parent
      new_category.save!
    end

    change_table :posts, bulk: true do |t|
      t.remove_references :parent
      t.remove :name
      t.remove :was_category
      t.remove :previous_id_as_category
      t.remove :previous_order_as_category
    end
  end
end
