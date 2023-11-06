# frozen_string_literal: true

module Types
  class BaseArgument < GraphQL::Schema::Argument
    def initialize(*args, require_logged_in: false, **kwargs, &block)
      @require_logged_in = require_logged_in
      super(*args, **kwargs, &block)
    end

    # Require user to be signed in to send queries with includeUnpublished set to true
    def authorized?(_obj, arg_value, context)
      super
      if @require_logged_in && arg_value
        context[:user_signed_in]
      else
        true
      end
    end
  end
end
