class MagnetsController < ApplicationController
  def index
    @magnets = Magnet.all
    render 'index'
  end

  def new
  end

  def create
    Magnet.create({url: params[:url], x: 0, y: 0, size_status: true})
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



