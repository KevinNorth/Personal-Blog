class User < ApplicationRecord
    # TODO: Do not deploy to server until authentication is set up

    has_many :posts, foreign_key: :author_id, inverse_of: :author
end
