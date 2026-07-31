from PIL import Image, ImageDraw
import sys

def make_circle(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Create mask
    mask = Image.new('L', img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + img.size, fill=255)
    
    # Apply mask
    output = Image.new('RGBA', img.size, (0, 0, 0, 0))
    output.paste(img, (0, 0), mask=mask)
    
    # Save
    output.save(output_path, format="PNG")

if __name__ == "__main__":
    make_circle(sys.argv[1], sys.argv[2])
