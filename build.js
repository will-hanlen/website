var md = require('markdown-it')({html: true});
var fs = require('fs');

// Template
var head1 = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>
`;

var head2 = `
</title>
<link href="https://fonts.googleapis.com/css?family=DM+Mono&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../style.css">
</head>
<body>
  <nav><a href="../index.html">← more essays</a></nav>
  <article>
  
  `
var foot = `
  </article>
</body>
</html>`


// Delete all the files from old builds
let oldCompiled = fs.readdirSync("essays");
for (ff of oldCompiled) {
  fs.unlinkSync(`essays/${ff}`);
}


// Go through the src directory
for (file of  fs.readdirSync("src")) {

  let filename = file.slice(0, file.indexOf("\."))

  let contents = fs.readFileSync(`src/${file}`, {encoding: "utf8"});

  // Use first line as document title
  let title = contents.substr(0, contents.indexOf("\n"));

  // make sure title doesn't have line breaks
  while (title.indexOf("<br>") > 0) {
    title = title.replace("<br>", "");
  }

  // put the pieces of the new HTML file together
  let newHTML = head1 + title + head2 + md.render(contents) + foot;

  // Write the built file
  fs.writeFileSync(`essays/${filename}.html`, newHTML);

}

