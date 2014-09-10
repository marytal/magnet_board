class CreateUploadedImages < ActiveRecord::Migration
  def change
    create_table :uploaded_images do |t|
      t.binary :image

      t.timestamps
    end
  end
end
