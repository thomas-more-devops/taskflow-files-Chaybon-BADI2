const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hallo vanuit mijn eerste Docker container! - Groeten Chaybon</h1>');
});

server.listen(3000, () => {
  console.log('Server draait op poort 3000');
});