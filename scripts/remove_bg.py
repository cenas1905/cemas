from rembg import remove
from PIL import Image
import io
import sys

def main():
    if len(sys.argv) < 3:
        print("Usage: python remove_bg.py <input> <output>")
        sys.exit(1)
        
    input_path = sys.argv[1]
    output_path = sys.argv[2]

    try:
        print(f"Reading {input_path}...")
        with open(input_path, 'rb') as i:
            input_data = i.read()

        print("Removing background...")
        output_data = remove(input_data)

        print("Cropping to bounding box...")
        img = Image.open(io.BytesIO(output_data))
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)

        img.save(output_path, format="PNG")
        print(f"Saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
