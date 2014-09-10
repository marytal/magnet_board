class UploadedImagesController < ApplicationController
  def show
    image = UploadedImage.find_by_id(params[:id])
    send_data(image.image, type: image.mime_type, disposition: 'inline')
  end
end