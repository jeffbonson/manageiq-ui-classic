class AutomatedWorkflowController < ApplicationController
  before_action :check_privileges
  before_action :get_session_data

  after_action :cleanup_action
  after_action :set_session_data

  include Mixins::GenericListMixin
  include Mixins::GenericSessionMixin
  include Mixins::GenericShowMixin
  include Mixins::BreadcrumbsMixin

  def self.model
    ManageIQ::Providers::EmbeddedAnsible::AutomationManager::Playbook
  end

  def show_list
    assert_privileges('automated_workflow_workflows_view')
    super
  end

  def show
    assert_privileges('automated_workflow_workflows_view')
    #super
  end

  def breadcrumbs_options
    {
      :breadcrumbs => [
        {:title => _("Automation")},
        {:title => _("Automated Workflow")},
        {:title => _("Workflows"), :url => controller_url},
      ],
    }
  end

  menu_section :automated_workflow_workflows
end
