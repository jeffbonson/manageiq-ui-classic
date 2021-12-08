module ChargebackAssignmentHelper
  def tenants(result, data)
    result_type("tenant", result)
    tenant_selection_items(result, data)
  end

  def tags_saved_items(result, items)
    saved_items = []
    items.sort_by { |x| x[:tag].first.parent.description }.each_with_index do |value, index|
      item = {:id => index.to_s, :cells => [], :clickable => true}
      tags = []
      tags.push({:text => value[:tag].first.parent.description})
      tags.push({:text => value[:tag].first.description})
      tags.push({:text => value[:cb_rate].description})
      item[:cells] = tags
      saved_items.push(item)
    end
    result[:saved_items] = saved_items
  end

  def tenant_selection_items(result, items)
    selection_items = []
    options = [[["<Nothing>", "nil"]] + items[:cb_rates].invert.sort]
    items[:cb_assign][:hierarchy].sort_by(&:first).each do |id, data|
      item = {:id => id.to_s, :cells => [], :clickable => true, :sub_items => []}
      selections = []
      selections.push(:text => data[:name])
      select_id = "#{items[:new][:cbshow_typ]}__#{id}"
      value = items[:new]["#{items[:new][:cbshow_typ]}__#{id}".to_sym].to_s
      selections.push(:type => "select", :options => options, :select_id => select_id, :value => value)
      item[:cells] = selections
      selection_items.push(item)
  
      sub_items = []
      data[:subtenant].each do |tenant|
        sub_item = {:id => id.to_s, :cells => [], :clickable => true}
        sub_slection = []
        selections.push(:text => tenant[:name])
        sub_select_id = "#{items[:new][:cbshow_typ]}__#{tenant[:id]}"
        sub_value = items[:new]["#{items[:new][:cbshow_typ]}__#{tenant[:id]}".to_sym].to_s
        sub_slection.push(:type => "select", :options => options, :select_id => sub_select_id, :value => sub_value)
        sub_item[:cells] = selections
        sub_items.push(sub_item)
      end
      item[:sub_item] = sub_items
    end
    result[:selections] = selection_items
  end

  def tags_selection_items(result, items)
    selection_items = []
    options = [[["<Nothing>", "nil"]] + items[:cb_rates].invert.sort]
    items[:cb_assign][:tags][items[:new][:cbtag_cat].to_i].invert.sort_by { |a| a.first.downcase }.each do |tag, id|
      item = {:id => id.to_s, :cells => [], :clickable => true}
      selections = []
      selections.push(:text => tag)
      select_id = "#{items[:new][:cbshow_typ]}__#{id}"
      value = items[:new][select_id.to_sym].to_s
      selections.push(:type => "select", :options => options, :select_id => select_id, :value => value)
      item[:cells] = selections
      selection_items.push(item)
    end
    result[:selections] = selection_items
  end

  def tags(result, data)
    result_type("tags", result)
    tags_saved_items(result, data[:current_assignment])
    tags_selection_items(result, data)
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
      tenants(result, data)
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
