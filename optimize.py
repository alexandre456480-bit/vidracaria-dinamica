import re

def optimize_css(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace transition: all with explicit properties
    content = re.sub(r'transition:\s*all\s*(.*?);', r'transition: opacity \1, transform \1, background-color \1, box-shadow \1;', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def optimize_js(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Wrap particlesJS initialization in requestIdleCallback or setTimeout
    if 'particlesJS(' in content and 'requestIdleCallback' not in content:
        # We will just replace the exact call structure if it starts with document.addEventListener
        pattern = r'(document\.addEventListener\("DOMContentLoaded",\s*function\(\)\s*\{)([\s\S]*?particlesJS\("particles-js"[\s\S]*?\}\);)(\s*\})'
        
        def replacer(match):
            return match.group(1) + '\n    setTimeout(function() {\n' + match.group(2) + '\n    }, 1000);' + match.group(3)
            
        content = re.sub(pattern, replacer, content)
        
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

optimize_css('style.css')
optimize_js('script.js')
print("Optimized CSS and JS")
