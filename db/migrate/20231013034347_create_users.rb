class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :login
      t.boolean :admin

      t.timestamps
    end
  end
end
