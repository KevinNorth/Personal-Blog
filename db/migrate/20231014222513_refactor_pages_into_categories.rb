# frozen_string_literal: true

class RefactorPagesIntoCategories < ActiveRecord::Migration[7.1]
  def change
    change_table :posts do |t|
      t.remove_references :page, null: false, foreign_key: true, index: true
      t.references :category, null: false, foreign_key: true, index: true
    end

    change_table :categories do |t|
      t.references :parent,
                   null: true,
                   foreign_key: { to_table: :categories },
                   index: true
    end

    drop_table :pages do |t|
      t.string :name, null: false
      t.integer :order, null: false
      t.boolean :single_post, null: false, default: false
      t.references :category, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
