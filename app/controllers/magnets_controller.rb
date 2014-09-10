class MagnetsController < ApplicationController
  def index
    @magnets = Magnet.all
    render 'index'
  end

  def new
  end

  def create
    if params[:some_file]
      uploaded_image = UploadedImage.new
      uploaded_image.image = params[:some_file].read
      uploaded_image.mime_type = params[:some_file].content_type
      uploaded_image.save

      params[:url] = "/uploaded_image/#{uploaded_image.id}"
    end


    Magnet.create({url: params[:url], x: 0, y: 0, size_status: true}) unless !params[:url]
    redirect_to '/'
  end

  def update
    @magnet = Magnet.find_by_id(params[:id])

    @magnet.update(params.permit(:x, :y, :size_status))

    render text: "saved"

  end

  def destroy
    @magnet = Magnet.find_by_id(params[:id])
    @magnet.destroy

    render text: "destroyed"
  end

end

# Stuff I want to do:
#   Resize pictures
#   Write text when double clicked
#   Remove pictures on right click (prompt 'are you sure?' first)



