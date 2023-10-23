# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'user_by_id', type: :request do
  describe 'when given id argument for a user that exists' do
    let!(:user) { create(:user) }
    let(:category) { create(:category) }
    let!(:posts_by_user) { create_list(:post, 3, author: user, category:) }

    it 'responds with the corresponding user' do
      query = <<~GQL
        query {
          userById(id: #{user.id}) {
            admin
            createdAt
            id
            login
            name
            posts {
              id
            }
            updatedAt
          }
        }
      GQL

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['userById']

      expect(result).to include(
        'admin' => user.admin,
        'id' => user.id.to_s,
        'login' => user.login,
        'name' => user.name
      )

      expect(DateTime.parse(result['createdAt'])).to eq(strip_milliseconds(user.created_at))
      expect(DateTime.parse(result['updatedAt'])).to eq(strip_milliseconds(user.updated_at))

      expected_post_ids = posts_by_user.pluck(:id).map(&:to_s)
      actual_post_ids = result['posts'].pluck('id')
      expect(actual_post_ids).to match_array(expected_post_ids)
    end
  end

  describe 'when given id argument that does not match a user' do
    let(:invalid_id) { User.count == 0 ? 1 : User.maximum(:id) + 1 }

    it 'responds with null' do
      query = <<~GQL
        query {
          userById(id: #{invalid_id}) {
            admin
            createdAt
            id
            login
            name
            posts {
              id
            }
            updatedAt
          }
        }
      GQL

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['userById']

      expect(result).to be_nil
    end
  end
end
