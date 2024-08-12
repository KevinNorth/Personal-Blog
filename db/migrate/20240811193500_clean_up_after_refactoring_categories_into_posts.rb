# frozen_string_literal: true

class CleanUpAfterRefactoringCategoriesIntoPosts < ActiveRecord::Migration[7.1]
  def up
    change_table :posts, bulk: true do |t|
      t.remove :was_category
      t.remove :previous_id_as_category
      t.remove :previous_parent_id_as_category
      t.remove :previous_order_as_category
      t.remove :category_id if t.column_exists? :category_id
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration,
          'This migration cannot be reverted because it ' \
          'destroys metadata that will no longer be needed going forward.'
  end
end
