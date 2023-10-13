class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :subtitle
      t.string :summary
      t.text :markdown
      t.binary :header_image
      t.integer :order
      t.references :page, null: false, foreign_key: true, index: true
      t.references :author, null: false, foreign_key: ({ to_table: :users })

      t.timestamps
    end
  end
end
