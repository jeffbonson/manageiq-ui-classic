class ApplicationHelper::Button::ButtonWithoutRbackCheck < ApplicationHelper::Button::Basic
  def role_allows_feature?
    true
  end
end
