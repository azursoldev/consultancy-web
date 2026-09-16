const http = require('http');

http.get('http://localhost:3000/blog/index.html', res => {
  console.log('/blog/index.html status:', res.statusCode);
});

http.get('http://localhost:3000/publication-detail.html', res => {
  console.log('/publication-detail.html status:', res.statusCode);
});
