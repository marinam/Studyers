class ClassResourcesController < ApplicationController
  before_filter :authenticate, :only => [:index, :show, :edit, :update, :destroy, :new]
  # GET /class_resources
  # GET /class_resources.json
  def index
    @class_resources = ClassResource.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @class_resources }
    end
  end
  
  def my
    @class_resources = ClassResource.where("user_id = ?", current_user.id)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @class_resources }
    end
  end

  # GET /class_resources/1
  # GET /class_resources/1.json
  def show
    @class_resource = ClassResource.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @class_resource }
    end
  end

  # GET /class_resources/new
  # GET /class_resources/new.json
  def new
    @class_resource = ClassResource.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @class_resource }
    end
  end

  # GET /class_resources/1/edit
  def edit
    @class_resource = ClassResource.find(params[:id])
    render :layout => false
  end

  # POST /class_resources
  # POST /class_resources.json
  def create
    @class_resource = ClassResource.new(params[:class_resource])
    @class_resource.user_id = current_user.id
      if @class_resource.save
        if params[:edit] 
          redirect_to edit_class_resource_path(@class_resource)
        else
          redirect_to class_resource_path(@class_resource)
        end
      else
        render :action => 'new'
      end
    
  end

  # PUT /class_resources/1
  # PUT /class_resources/1.json
  def update
    @class_resource = ClassResource.find(params[:id])

    respond_to do |format|
      if @class_resource.update_attributes(params[:class_resource])
        format.html { redirect_to @class_resource, notice: "The ID for this class presentation is: #{@class_resource.id}" }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @class_resource.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /class_resources/1
  # DELETE /class_resources/1.json
  def destroy
    @class_resource = ClassResource.find(params[:id])
    @class_resource.destroy

    respond_to do |format|
      format.html { redirect_to class_resources_url }
      format.json { head :ok }
    end
  end
end
