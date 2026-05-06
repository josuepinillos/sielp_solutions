import { createServer } from 'http';
import { readFile } from 'fs';
import { join, extname } from 'path';

const PORT = 3000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
};

const server = createServer((req, res) => {
    // Default to index.html for root path
    let filePath = req.url === '/' ? '/index.html' : req.url;
    // Strip query parameters
    filePath = filePath.split('?')[0];
    
    // Construct absolute path
    const absolutePath = join(process.cwd(), filePath);
    
    // Get file extension
    const ext = String(extname(absolutePath)).toLowerCase();
    
    // Set default content type
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    readFile(absolutePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end(`File not found: ${filePath}`);
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
