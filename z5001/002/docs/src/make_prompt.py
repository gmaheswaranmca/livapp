import re
import pyperclip
import sys
QNO = int(sys.argv[1])
SOURCE_DIR_NAME = '31'
SOURCE_DIR = f'./../{SOURCE_DIR_NAME}/'
SOURCE_FILE = f'{SOURCE_DIR}/000.md'

PROMPT = '''Problem Statement:
{problem_statement}

Prompt:
Language: Python
Let me know the solution patterns, and code for pattern.
Optimized solution pattern by comparing patterns.'''

def read_problem_statements(file_path):   
    problem_statements = []

    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    for line in lines[QNO:]:  # Skip first line (category)
        text = line.strip()
        
        if not text:
            continue

        # Remove leading number, dot, and space (e.g., "1. ")
        text = re.sub(r'^\d+\.\s*', '', text)

        problem_statements.append(text.strip())

    return problem_statements

def main_copy_ps():
    problem_statements = read_problem_statements(SOURCE_FILE)
    
    for index, ps in enumerate(problem_statements):        
        parsed_prompt = PROMPT.format(problem_statement=ps)
        print(f'#{index + 1} Prompt:')
        print('-' * 80)
        print(parsed_prompt)
        print('-' * 80)

        choice = input('Copy to clipboard(y/n)?') 
        if choice == 'y':
            pyperclip.copy(parsed_prompt)
            print("Copied to clipboard.")
            print()
            print()
        else:
            continue 

        choice = input('Continue to next problem(y/n)?') 
        if choice != 'y':
            break 
        print()
        print()

main_copy_ps()