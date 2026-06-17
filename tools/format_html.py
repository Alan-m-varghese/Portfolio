import re

def format_html(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Simple formatting: add newlines after tags, then indent
    # We will do a basic tokenization of HTML tags and text.
    pattern = re.compile(r'(<\/?[a-zA-Z0-9:-]+(?:\s+[a-zA-Z0-9:-]+(?:=(?:"[^"]*"|\'[^\']*\'|[^\s>]+))?)*\s*\/?>|[^<]+)')
    tokens = pattern.findall(content)
    
    formatted = []
    indent_level = 0
    indent_str = "  "
    
    inline_tags = {'title', 'meta', 'link', 'script', 'noscript', 'input', 'textarea', 'img', 'a'}
    
    # We will adjust indentation dynamically
    for token in tokens:
        token = token.strip()
        if not token:
            continue
            
        # Is it a tag?
        if token.startswith('<') and token.endswith('>'):
            is_closing = token.startswith('</')
            is_self_closing = token.endswith('/>') or token.startswith('<input') or token.startswith('<img') or token.startswith('<meta') or token.startswith('<link')
            
            # Clean attributes to have quotes
            # Example: class=displaynone -> class="displaynone"
            # href=css/style.css -> href="css/style.css"
            tag_name = re.match(r'^<\/?([a-zA-Z0-9:-]+)', token).group(1)
            
            # Find all unquoted attributes and wrap them
            attrs_pattern = re.compile(r'(\s+[a-zA-Z0-9:-]+=)([^"\'][^\s>]+)')
            token = attrs_pattern.sub(r'\1"\2"', token)
            
            # Additional double quote normalization if missing
            token = re.sub(r'src=([^"\'][^\s>]+)', r'src="\1"', token)
            token = re.sub(r'href=([^"\'][^\s>]+)', r'href="\1"', token)
            token = re.sub(r'class=([^"\'][^\s>]+)', r'class="\1"', token)
            token = re.sub(r'id=([^"\'][^\s>]+)', r'id="\1"', token)
            
            if is_closing:
                indent_level = max(0, indent_level - 1)
                formatted.append(indent_str * indent_level + token)
            else:
                formatted.append(indent_str * indent_level + token)
                if not is_self_closing and tag_name not in inline_tags:
                    indent_level += 1
        else:
            # It's text
            formatted.append(indent_str * indent_level + token)
            
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(formatted))

if __name__ == "__main__":
    format_html("index_original.html", "index.html")
    print("Formatting complete. Output saved to index.html.")
