module ApplicationHelper
  def title
    base_title = "Studyers"
    if @title.nil?
      base_title
    else
      "#{base_title} | #{@title}"
    end
  end

  def current_class?(test_path)
    return 'current' if request.request_uri == test_path
  end
end
