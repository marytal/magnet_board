class BigOrSmall < ActiveRecord::Migration
  def change
    add_column :magnets, :size_status, :boolean
  end
end
