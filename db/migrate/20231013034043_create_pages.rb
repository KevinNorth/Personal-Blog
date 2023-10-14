# frozen_string_literal: true

class CreatePages < ActiveRecord::Migration[7.1]
  def change
    create_table :pages do |t|
      t.string :name, null: false
      t.integer :order, null: false
      t.boolean :single_post, null: false, default: false
      t.references :category, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
