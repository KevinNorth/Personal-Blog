# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'admin requests' do
  describe '/admin' do
    it 'opens the admin React app' do
      get '/admin'

      expect(response).to render_template :admin
    end
  end
end
