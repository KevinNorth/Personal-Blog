# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'post_by_parent_and_own_slug', type: :request do
  before do
    sign_in create(:user)
  end

  def get_query(parent_slug:, post_slug:, include_unpublished:)
    <<~GQL
      query {
        postByParentAndOwnSlug(parentSlug: "#{parent_slug}", postSlug: "#{post_slug}", includeUnpublished: #{include_unpublished}) {
          createdAt
          id
          markdown
          name
          order
          author {
            id
          }
          parent {
            id
          }
          children {
            id
          }
          published
          slug
          subtitle
          summary
          title
          updatedAt
        }
      }
    GQL
  end

  shared_examples 'responds with post' do
    it 'responds with the corresponding post' do
      query = get_query(parent_slug: db_post.parent.slug, post_slug: db_post.slug, include_unpublished:)

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['postByParentAndOwnSlug']

      expect(result).to include(
        'id' => db_post.id.to_s,
        'markdown' => db_post.markdown,
        'name' => db_post.name,
        'order' => db_post.order,
        'published' => db_post.published,
        'slug' => db_post.slug,
        'subtitle' => db_post.subtitle,
        'summary' => db_post.summary,
        'title' => db_post.title
      )

      expect(DateTime.parse(result['createdAt'])).to eq(strip_milliseconds(db_post.created_at))
      expect(DateTime.parse(result['updatedAt'])).to eq(strip_milliseconds(db_post.updated_at))

      expect(result['author']['id']).to eq(db_post.author.id.to_s)
      expect(result['parent']['id']).to eq(db_post.parent.id.to_s)

      expected_children_ids = children_posts.pluck(:id).map(&:to_s)
      actual_children_ids = result['children'].pluck('id')
      expect(actual_children_ids).to match_array(expected_children_ids)
    end
  end

  shared_examples 'responds with null' do
    it 'responds with null' do
      query = get_query(post_slug:, parent_slug:, include_unpublished:)

      post graphql_path, params: { query: }
      json = JSON.parse(response.body)
      result = json['data']['postByParentAndOwnSlug']

      expect(result).to be_nil
    end
  end

  describe 'when given slug argument for a parent post that exists' do
    describe 'when the parent is published' do
      let(:author) { create(:user) }
      let(:parent) { create(:post, author:, published: true) }
      let!(:db_post) { create(:post, author:, parent:, published: true) }

      describe 'when include_unpublished is false' do
        let(:include_unpublished) { false }
        let(:children_posts) { [] }

        before do
          # Unpublished posts should not appear in the query response.
          # Since these posts aren't in children_posts, the shared example
          # won't be expecting them in its assertions.
          create_list(:post, 3, parent: db_post, author:, published: false)
        end

        include_examples 'responds with post'
      end

      describe 'when include_unpublished is true' do
        # Unpublished posts should appear in the query response.
        # Since these posts are added to childred_posts, the
        # shared example will expect them in its assertions.
        let!(:children_posts) do
          published_posts = create_list(:post, 3, parent: db_post, author:, published: true)
          unpublished_posts = create_list(:post, 3, parent: db_post, author:, published: false)
          published_posts + unpublished_posts
        end

        let(:include_unpublished) { true }

        include_examples 'responds with post'
      end
    end

    describe 'when the post is not published' do
      let(:author) { create(:user) }
      let(:parent) { create(:post, author:, published: false) }
      let!(:db_post) { create(:post, author:, parent:, published: false) }
      let!(:children_posts) { create_list(:post, 3, parent: db_post, author:, published: false) }

      describe 'when include_unpublished is false' do
        let(:include_unpublished) { false }
        let(:post_slug) { db_post.slug }
        let(:parent_slug) { db_post.parent.slug }

        include_examples 'responds with null'
      end

      describe 'when include_unpublished is true' do
        let(:include_unpublished) { true }

        include_examples 'responds with post'
      end
    end
  end

  describe 'when given parent_slug argument that does not match a parent' do
    let(:author) { create(:user) }
    let!(:db_post) { create(:post, author:, published: true) }
    let(:parent_slug) { 'this-slug-does-not-exist' }
    let(:post_slug) { db_post.slug }

    describe 'when include_unpublished is false' do
      let(:include_unpublished) { false }

      include_examples 'responds with null'
    end

    describe 'when include_unpublished is true' do
      let(:include_unpublished) { true }

      include_examples 'responds with null'
    end
  end

  describe 'when given slug argument that does not match a parent' do
    let(:author) { create(:user) }
    let!(:parent) { create(:post, author:, published: true) }
    let(:parent_slug) { parent.slug }
    let(:post_slug) { 'this-slug-does-not-exist' }

    describe 'when include_unpublished is false' do
      let(:include_unpublished) { false }

      include_examples 'responds with null'
    end

    describe 'when include_unpublished is true' do
      let(:include_unpublished) { true }

      include_examples 'responds with null'
    end
  end
end
