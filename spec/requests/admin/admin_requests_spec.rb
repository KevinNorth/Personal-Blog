# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'admin requests' do
  describe '/blog' do
    it 'opens the blog React app' do
      get '/admin'

      expect(response).to render_template :admin
    end
  end
end
