require "json"
def parse_liquid_output_in(input, context)
    output = input.to_s()
    for match in output.scan(/{{[^,]*}}/)
        stripped = match.gsub("{{","").gsub("}}","").strip
        value = "#{context[stripped]}"
        if value.empty?
           value = match
        end
        output = output.sub(match, value)
    end
    return output
end
