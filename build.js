var md = require('markdown-it')();
var fs = require('fs');

// Empty essays directory
if (fs.existsSync('public/essays')) {
  for (file of  fs.readdirSync("public/essays")) {
    fs.unlinkSync(`public/essays/${file}`);
  }
}

// Delete the essays directory
if (fs.existsSync('public/essays')) {
  fs.rmdirSync('public/essays', { recursive: true })
}

// Create a new, blank essays directory
fs.mkdirSync("public/essays")

// Go through the src directory
for (file of  fs.readdirSync("src")) {

  // Ignore files that have underscores at the beginning
  if (file[0] != "_") {

    // Get the markdown filename without the .md extension
    let filename = file.slice(0, file.indexOf("\."))

    // Read the markdown file
    let contents = fs.readFileSync(`src/${file}`, {encoding: "utf8"});

    // Use first line as document title (without the # header symbol)
    title = contents.substr(2, contents.indexOf("\n"));
    
    // Render contents
    let article = md.render(contents)

    // Fill the HTML template
    let newHTML = fillTemplate(title, article)

    // Write the new HTMl file
    fs.writeFileSync(`public/essays/${filename}.html`, newHTML);
  }
}

function fillTemplate(title, article) {
  template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${title}</title>

<link href="https://fonts.googleapis.com/css?family=DM+Mono&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../style.css">
</head>
<body>
  <nav><a href="../index.html">← more essays</a></nav>
  <article>
  ${article}
  </article>
</body>
</html>
`;

  return template;
}
