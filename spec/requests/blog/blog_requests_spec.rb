# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'blog requests' do
  describe 'root endpoint' do
    it 'renders the blog app' do
      get '/'
      expect(response).to render_template :blog
    end

    describe 'when React Router bits appear in the URL' do
      it 'still renders the blog app' do
        get '/post'
        expect(response).to render_template :blog
      end
    end
  end

  describe '/index' do
    it 'redirects to /' do
      get '/index'
      expect(response).to redirect_to('/')
    end
  end

  describe '/blog' do
    it 'redirects to /' do
      get '/blog'
      expect(response).to redirect_to('/')
    end
  end
end
