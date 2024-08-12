# frozen_string_literal: true

class NotAnAncestorOfItselfValidator < ActiveModel::Validator
  def validate(record)
    ancestor = record.parent

    while ancestor
      if ancestor.id == record.id
        record.errors.add :parent, "A #{record.class.name.demodulize} cannot be a descendant of itself."
        return
      end

      ancestor = ancestor.parent
    end
  end
end
