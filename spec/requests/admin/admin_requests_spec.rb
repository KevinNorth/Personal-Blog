# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'admin requests' do
  before do
    sign_in create(:user)
  end

  describe '/admin' do
    it 'opens the admin React app' do
      get '/admin'

      expect(response).to render_template :admin
    end

    describe 'when React Router bits appear in the URL' do
      it 'still renders the admin app' do
        get '/admin/post'
        expect(response).to render_template :admin
      end
    end
  end
end
