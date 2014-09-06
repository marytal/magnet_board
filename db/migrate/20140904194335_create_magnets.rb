class CreateMagnets < ActiveRecord::Migration
  def change
    create_table :magnets do |t|
      t.string :url
      t.integer :x
      t.integer :y

      t.timestamps
    end
  end
end
