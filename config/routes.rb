# frozen_string_literal: true

Rails.application.routes.draw do
  root to: redirect('/blog')
  get 'index', to: redirect('/blog')
  get 'blog' => 'blog#blog'
  get 'blog/*all' => 'blog#blog'

  get 'admin/' => 'admin#admin'
  get 'admin/*all' => 'admin#admin'

  devise_for :users, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout' }
  get 'login', to: redirect('/auth/login')

  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?
  post '/graphql', to: 'graphql#execute', as: :graphql

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check
end
