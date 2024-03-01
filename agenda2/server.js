import express from 'express';
import morgan from 'morgan';

const app = express();

// Usa Morgan para registrar las solicitudes HTTP con la configuración 'tiny'
app.use(morgan('tiny'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/api/persons', (req, res) => {
    // console.log(req.body)
    res.send('You made a post request');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});