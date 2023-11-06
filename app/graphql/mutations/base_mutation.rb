# frozen_string_literal: true

module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    def ready?(**_args)
      if context[:user_signed_in] # rubocop:disable Style/GuardClause
        true
      else
        raise GraphQL::ExecutionError, 'Cannot call mutations unless you are a site admin.'
      end
    end
  end
end
