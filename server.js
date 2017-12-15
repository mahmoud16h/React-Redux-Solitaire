import express from 'express';
import path from 'path';
const port= process.env.PORT || 3001;
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

app.listen(port);
console.log('server started');