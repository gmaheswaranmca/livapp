from bs4 import BeautifulSoup
import csv

INPUT_FILE = "05-icpc-probs.txt"
OUTPUT_FILE = "cses_problems.csv"

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

rows = []

for heading in soup.find_all("h2"):
    category = heading.get_text(strip=True)

    ul = heading.find_next_sibling("ul")
    if not ul:
        continue

    for li in ul.find_all("li", class_="task"):
        a = li.find("a")
        if not a:
            continue

        problem = a.get_text(strip=True)
        href = a.get("href", "")

        if href.startswith("/"):
            href = "https://cses.fi" + href

        rows.append([category, problem, href])

with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["Category", "Problem", "Link"])
    writer.writerows(rows)

print(f"Created {OUTPUT_FILE}")
print(f"Total problems: {len(rows)}")