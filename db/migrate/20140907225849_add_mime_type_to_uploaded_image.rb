class AddMimeTypeToUploadedImage < ActiveRecord::Migration
  def change
    add_column :uploaded_images, :mime_type, :string
  end
end
