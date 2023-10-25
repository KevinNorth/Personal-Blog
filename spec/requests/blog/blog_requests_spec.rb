# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'blog requests' do
  describe 'root endpoint' do
    it 'redirects to /blog' do
      get '/'
      expect(response).to redirect_to(blog_path)
    end
  end

  describe '/index' do
    it 'redirects to /blog' do
      get '/index'
      expect(response).to redirect_to(blog_path)
    end
  end

  describe '/blog' do
    it 'renders the blog app' do
      get '/blog'
      expect(response).to render_template :blog
    end

    describe 'when React Router bits appear in the URL' do
      it 'still renders the blog app' do
        get '/blog/category/post'
        expect(response).to render_template :blog
      end
    end
  end
end
