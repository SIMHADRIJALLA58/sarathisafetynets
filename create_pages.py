import os
from html import escape

# ============================================================
# WEBSITE FOLDER
# Change this to your website folder
# ============================================================

ROOT_FOLDER = "."


# ============================================================
# OUTPUT FILE
# ============================================================

OUTPUT_FILE = os.path.join(ROOT_FOLDER, "pages.html")


# ============================================================
# FIND ALL HTML FILES
# ============================================================

html_files = []

for root, dirs, files in os.walk(ROOT_FOLDER):

    # Ignore common folders
    dirs[:] = [
        d for d in dirs
        if d not in {
            ".git",
            ".vercel",
            "node_modules"
        }
    ]

    for file in files:

        if not file.lower().endswith(".html"):
            continue

        # Don't include pages.html itself
        if os.path.abspath(os.path.join(root, file)) == os.path.abspath(OUTPUT_FILE):
            continue

        full_path = os.path.join(root, file)

        relative_path = os.path.relpath(
            full_path,
            ROOT_FOLDER
        )

        # Convert Windows \ to /
        relative_path = relative_path.replace("\\", "/")

        html_files.append(relative_path)


# ============================================================
# SORT FILES
# ============================================================

html_files.sort(key=str.lower)


# ============================================================
# CREATE NUMBERED LINKS
# ============================================================

links = []

for index, file_path in enumerate(html_files, start=1):

    safe_path = escape(file_path, quote=True)

    links.append(
        f'''
        <li>
          <a href="{safe_path}">
            {escape(file_path)}
          </a>
        </li>
        '''
    )


# ============================================================
# COMPLETE PAGES.HTML
# ============================================================

html = f'''<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <meta name="robots"
        content="index, follow">

  <title>All Pages | Simon Safety Nets</title>

  <meta name="description"
        content="Browse all service and location pages of Simon Safety Nets.">

  <link rel="canonical"
        href="https://sarathisafetynets.in/pages.html">

  <style>

    * {{
      box-sizing: border-box;
    }}

    body {{
      margin: 0;
      padding: 40px 20px;

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      background: #f7f7f7;
      color: #111;
    }}

    .page-container {{
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;

      background: #fff;

      padding: 35px;

      border-radius: 12px;

      box-shadow:
        0 10px 35px rgba(0,0,0,.08);
    }}

    h1 {{
      margin: 0 0 10px;

      font-size: 32px;
      line-height: 1.2;
    }}

    .description {{
      margin-bottom: 30px;

      color: #555;

      line-height: 1.7;
    }}

    ol {{
      margin: 0;
      padding-left: 30px;
    }}

    li {{
      margin-bottom: 10px;
      padding-left: 5px;
    }}

    a {{
      color: #b71c1c;
      text-decoration: none;

      line-height: 1.6;
    }}

    a:hover {{
      text-decoration: underline;
    }}

    @media (max-width: 600px) {{

      body {{
        padding: 20px 12px;
      }}

      .page-container {{
        padding: 22px 18px;
      }}

      h1 {{
        font-size: 25px;
      }}

      a {{
        font-size: 14px;
        word-break: break-word;
      }}

    }}

  </style>

</head>


<body>

  <main class="page-container">
  <h1>
      Simon Safety Nets – All Pages
    </h1>

    <p class="description">
      Browse all service and location pages available on
      <strong>Sarathi Safety Nets</strong>.
      This page contains direct links to the HTML pages
      available throughout the website.
    </p>

    <ol>

      {''.join(links)}

    </ol>

  </main>

</body>

</html>
'''


# ============================================================
# WRITE FILE
# ============================================================

with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as f:

    f.write(html)


print("==========================================")
print("pages.html created successfully")
print("==========================================")
print(f"Total HTML pages found: {len(html_files)}")
print(f"Output: {OUTPUT_FILE}")
print("==========================================")