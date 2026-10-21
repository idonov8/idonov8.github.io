#!/usr/bin/env python3
"""
Preview Image Generator for Haus Apetit Events

This script generates favicon and social media preview images for event invitations.
Customize the colors, text, and design elements for each event.

Usage:
    python3 preview-generator.py

Requirements:
    pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont

# ============================================================================
# EVENT CONFIGURATION - CUSTOMIZE THESE FOR EACH EVENT
# ============================================================================

# This configuration is for: HUMMUS & JAM event (October 18, 2025)

# Color scheme (earthy tones for hummus theme)
BACKGROUND_COLOR = '#f5ead6'  # Cream/beige
GRADIENT_START = (245, 234, 214)  # Light cream (RGB)
GRADIENT_END = (212, 184, 150)    # Darker tan (RGB)
PRIMARY_TEXT_COLOR = '#d4691a'    # Orange/rust
SECONDARY_TEXT_COLOR = '#8b6f47'  # Brown
TERTIARY_TEXT_COLOR = '#6b5639'   # Dark brown
ACCENT_COLOR = '#7a9b5f'          # Green (for shadow)
CHICKPEA_COLOR = '#c4a77d'        # Tan (for decorative elements)

# Event details
EVENT_TITLE = "HUMMUS & JAM"
EVENT_DATE = "October 18, 2025 • 17:00"
EVENT_LOCATION = "Haus Apetit • Berlin"

# File paths
OUTPUT_FAVICON = '/Users/idonov/Code/GitHub/personal-website/assets/Haus Apetit/hummus-favicon.png'
OUTPUT_PREVIEW = '/Users/idonov/Code/GitHub/personal-website/assets/Haus Apetit/hummus-preview.png'

# ============================================================================
# FAVICON GENERATION (32x32)
# ============================================================================

def create_favicon():
    """Create a simple hummus bowl favicon (32x32 pixels)"""
    img = Image.new('RGB', (32, 32), color=BACKGROUND_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Draw a simple hummus bowl
    # Bowl (brown)
    draw.ellipse([6, 18, 26, 28], fill='#8b6f47', outline='#6b5639', width=1)
    # Hummus (beige/tan)
    draw.ellipse([8, 12, 24, 26], fill='#d4b896', outline='#c4a77d', width=1)
    # Chickpeas on top (small dots)
    draw.ellipse([11, 14, 13, 16], fill='#c4a77d')
    draw.ellipse([16, 13, 18, 15], fill='#c4a77d')
    draw.ellipse([19, 15, 21, 17], fill='#c4a77d')
    # Tahini swirl (lighter color)
    draw.arc([10, 16, 22, 22], 0, 180, fill='#e0d0b0', width=1)
    
    img.save(OUTPUT_FAVICON)
    print(f"✓ Favicon created: {OUTPUT_FAVICON}")
    return img

# ============================================================================
# PREVIEW GENERATION (1200x630 for social media)
# ============================================================================

def create_preview():
    """Create a social media preview image (1200x630 pixels)"""
    # Create base image
    prev = Image.new('RGB', (1200, 630), color=BACKGROUND_COLOR)
    draw_prev = ImageDraw.Draw(prev)
    
    # Create gradient background (top to bottom)
    for i in range(630):
        # Calculate gradient color for this line
        ratio = i / 630
        r = int(GRADIENT_START[0] - (GRADIENT_START[0] - GRADIENT_END[0]) * ratio)
        g = int(GRADIENT_START[1] - (GRADIENT_START[1] - GRADIENT_END[1]) * ratio)
        b = int(GRADIENT_START[2] - (GRADIENT_START[2] - GRADIENT_END[2]) * ratio)
        draw_prev.line([(0, i), (1200, i)], fill=(r, g, b))
    
    # Load fonts (try Comic Sans for retro vibe, fallback to system fonts)
    try:
        font_large = ImageFont.truetype("/System/Library/Fonts/Supplemental/Comic Sans MS.ttf", 100)
        font_medium = ImageFont.truetype("/System/Library/Fonts/Supplemental/Comic Sans MS.ttf", 50)
        font_small = ImageFont.truetype("/System/Library/Fonts/Supplemental/Comic Sans MS.ttf", 35)
    except:
        try:
            font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 100)
            font_medium = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 50)
            font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 35)
        except:
            # Fallback to default font
            font_large = ImageFont.load_default()
            font_medium = ImageFont.load_default()
            font_small = ImageFont.load_default()
    
    # Draw event title with shadow effect
    # Shadow (offset)
    draw_prev.text((605, 245), EVENT_TITLE, fill=ACCENT_COLOR, font=font_large, anchor="mm")
    # Main text
    draw_prev.text((600, 240), EVENT_TITLE, fill=PRIMARY_TEXT_COLOR, font=font_large, anchor="mm")
    
    # Draw event date and time
    draw_prev.text((600, 350), EVENT_DATE, fill=SECONDARY_TEXT_COLOR, font=font_medium, anchor="mm")
    
    # Draw location
    draw_prev.text((600, 420), EVENT_LOCATION, fill=TERTIARY_TEXT_COLOR, font=font_small, anchor="mm")
    
    # Add decorative chickpea elements (circles in corners and sides)
    chickpea_positions = [
        (100, 100),   # Top left
        (1100, 100),  # Top right
        (100, 530),   # Bottom left
        (1100, 530),  # Bottom right
        (200, 300),   # Middle left
        (1000, 300)   # Middle right
    ]
    
    for x, y in chickpea_positions:
        draw_prev.ellipse(
            [x-15, y-15, x+15, y+15], 
            fill=CHICKPEA_COLOR, 
            outline=SECONDARY_TEXT_COLOR, 
            width=2
        )
    
    prev.save(OUTPUT_PREVIEW)
    print(f"✓ Preview image created: {OUTPUT_PREVIEW}")
    return prev

# ============================================================================
# MAIN EXECUTION
# ============================================================================

if __name__ == "__main__":
    print("Generating Haus Apetit event images...")
    print(f"Event: {EVENT_TITLE}")
    print()
    
    # Generate both images
    create_favicon()
    create_preview()
    
    print()
    print("✓ All images created successfully!")
    print()
    print("Next steps:")
    print("1. Update the HTML file to reference these images")
    print("2. Update the og:image meta tag for social media preview")
    print("3. Test the images in a browser")





