module ChargebackAssignmentHelper
  def tenants(result)
    result_type("tenant", result)
  end

  def saved_items(items, result)
    cells = []
    items.sort_by { |x| x[:tag].first.parent.description }.each do |value|
      tags = []
      tags.push({:text => value[:tag].first.parent.description})
      tags.push({:text => value[:tag].first.description})
      tags.push({:text => value[:cb_rate].description})
      cells.push(tags)
    end
    result[:saved_items][:cells] = cells
  end

  def selection_items(items, result)
    cells = []
    items[:cb_assign][:tags][items[:new][:cbtag_cat].to_i].invert.sort_by { |a| a.first.downcase }.each do |tag, id|
      cells.push(:text => tag)
      options = [[["<Nothing>", "nil"]] + items[:cb_rates].invert.sort]
      select_id = "#{items[:new][:cbshow_typ]}__#{id}"
      value = items[:new][select_id.to_sym].to_s
      cells.push(:type => "select", :options => options, :select_id => select_id, :value => value)
    end
    result[:selections][:cells] = cells
  end

  def tags(result, data)
    result_type("tags", result)
    saved_items(data[:current_assignment], result)
    selection_items(data, result)
  end

  def labels(result)
    result_type("labels", result)
  end

  def others(result)
    result_type("others", result)
  end

  def result_type(type, result)
    result[:type] = type
  end

  def chargeback_assignment_data(data)
    result = {:type => "", :saved_items => {}, :selections => {}}
    case data[:new][:cbshow_typ]
    when "tenant"
      tenants(result)
    when ->(type) { type.ends_with?('-tags') }
      tags(result, data)
    when ->(type) { type.ends_with?('-labels') }
      labels(result)
    else
      others(result)
    end
    @data = result
  end
end
