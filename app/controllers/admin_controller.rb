# frozen_string_literal: true

class AdminController < ApplicationController
  layout :admin

  before_action :authenticate_user!

  def admin; end
end
