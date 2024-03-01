import express from 'express';
import morgan from 'morgan';

const app = express();

// app.use(morgan('tiny'));

app.use(express.json());
morgan.token('body', (request) => {return JSON.stringify(request.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
  response.send('Hello, world!');
});

app.post('/api/persons', (request, response) => {
    response.send('You made a post request');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});