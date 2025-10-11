#!/usr/bin/env python3
"""
Extract content from Wix HTML and create standalone version
"""
import re
import os
import sys
from pathlib import Path
from urllib.parse import urlparse, unquote
import hashlib

def extract_styles(html_content):
    """Extract all style tags from HTML"""
    style_pattern = r'<style[^>]*>(.*?)</style>'
    styles = re.findall(style_pattern, html_content, re.DOTALL)
    return styles

def extract_scripts(html_content):
    """Extract all script tags from HTML"""
    script_pattern = r'<script[^>]*>(.*?)</script>'
    scripts = re.findall(script_pattern, html_content, re.DOTALL)
    return scripts

def find_image_urls(html_content):
    """Find all image URLs from Wix CDN"""
    # Pattern for static.wixstatic.com images
    pattern = r'https://static\.wixstatic\.com/media/[^\s"\'\)>]+'
    urls = re.findall(pattern, html_content)
    return list(set(urls))  # Remove duplicates

def clean_wix_dependencies(html_content):
    """Remove Wix-specific tracking and dependencies"""
    # Remove Wix ads
    html_content = re.sub(r'<div[^>]*WIX_ADS[^>]*>.*?</div>', '', html_content, flags=re.DOTALL)
    
    # Remove Wix tracking scripts
    html_content = re.sub(r'<script[^>]*fedops[^>]*>.*?</script>', '', html_content, flags=re.DOTALL)
    html_content = re.sub(r'<script[^>]*wix-essential[^>]*>.*?</script>', '', html_content, flags=re.DOTALL)
    
    # Remove Wix generator meta tag
    html_content = re.sub(r'<meta[^>]*generator[^>]*Wix[^>]*>', '', html_content)
    
    return html_content

def main():
    wix_html_path = Path('pagine/wixpages/home.html')
    
    if not wix_html_path.exists():
        print(f"Error: {wix_html_path} not found")
        return 1
    
    print("Reading Wix HTML...")
    with open(wix_html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    print(f"HTML size: {len(html_content)} chars")
    
    # Extract styles
    print("\nExtracting styles...")
    styles = extract_styles(html_content)
    print(f"Found {len(styles)} style blocks")
    
    # Save combined CSS
    css_output = Path('css/extracted-wix.css')
    with open(css_output, 'w', encoding='utf-8') as f:
        f.write("/* Extracted from Wix HTML */\n\n")
        for i, style in enumerate(styles):
            f.write(f"/* Style block {i+1} */\n")
            f.write(style.strip())
            f.write("\n\n")
    print(f"Saved CSS to {css_output}")
    
    # Extract scripts
    print("\nExtracting scripts...")
    scripts = extract_scripts(html_content)
    print(f"Found {len(scripts)} script blocks")
    
    # Find image URLs
    print("\nFinding image URLs...")
    image_urls = find_image_urls(html_content)
    print(f"Found {len(image_urls)} unique image URLs")
    
    # Save image URLs list
    urls_file = Path('images/wix-image-urls.txt')
    with open(urls_file, 'w', encoding='utf-8') as f:
        for url in sorted(image_urls):
            f.write(url + '\n')
    print(f"Saved image URLs to {urls_file}")
    
    # Clean HTML
    print("\nCleaning Wix dependencies...")
    cleaned_html = clean_wix_dependencies(html_content)
    
    return 0

if __name__ == '__main__':
    sys.exit(main())
