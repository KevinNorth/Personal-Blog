# frozen_string_literal: true

class AddDeviseToUsers < ActiveRecord::Migration[7.1]
  def change
    change_table :users, bulk: true do |t|
      ## Database authenticatable
      t.string :encrypted_password, null: false, default: ''

      ## Rememberable
      t.datetime :remember_created_at
    end

    add_index :users, :login, unique: true
  end
end
