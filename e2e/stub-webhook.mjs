// Webhook falso para os testes E2E: guarda os leads recebidos em memória.
// POST /lead → 200 | GET /received → JSON | DELETE /received → limpa
import { createServer } from 'node:http';

const received = [];
const port = Number(process.env.STUB_PORT ?? 3199);

createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/lead') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      received.push({ headers: req.headers, body: JSON.parse(body || '{}') });
      res.writeHead(200, { 'Content-Type': 'application/json' }).end('{"ok":true}');
    });
    return;
  }
  if (req.url === '/received' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(received));
    return;
  }
  if (req.url === '/received' && req.method === 'DELETE') {
    received.length = 0;
    res.writeHead(204).end();
    return;
  }
  if (req.url === '/health') {
    res.writeHead(200).end('ok');
    return;
  }
  res.writeHead(404).end();
}).listen(port, () => console.log(`stub-webhook on ${port}`));
