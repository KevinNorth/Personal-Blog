# frozen_string_literal: true

class RemoveAdminFromUser < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :admin, :boolean, null: false, default: false
  end
end
