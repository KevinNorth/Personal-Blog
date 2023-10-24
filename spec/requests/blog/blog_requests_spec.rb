# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'blog requests' do
  shared_examples 'opens the blog React app' do
    it 'opens the blog React app' do
      get endpoint

      expect(response).to render_template :index
    end
  end

  describe 'root endpoint' do
    let(:endpoint) { '' }

    include_examples 'opens the blog React app'
  end

  describe '/blog' do
    let(:endpoint) { '/blog' }

    include_examples 'opens the blog React app'
  end

  describe '/index' do
    let(:endpoint) { '/index' }

    include_examples 'opens the blog React app'
  end
end
