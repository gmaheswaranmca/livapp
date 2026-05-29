import pyperclip
import sys

FILE_NAME = sys.argv[1]
DEST_DIR_NAME = '31'
DEST_DIR = f'./../{DEST_DIR_NAME}/'
DEST_FILE = f'{DEST_DIR}/{FILE_NAME}.md'

# Read text from clipboard
clipboard_text = pyperclip.paste()
print(repr(clipboard_text)[:100])

# Save to file
with open(DEST_FILE, "w", encoding="utf-8", newline='') as file:
    file.write(clipboard_text)

print(f"Clipboard content saved to {DEST_FILE}")