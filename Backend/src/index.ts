import cors from 'cors';

import express, { Request, Response } from 'express';
import apiRoute from './router/route';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/',apiRoute)
app.listen(process.env.PORT || 4000, () => {
    console.log('Server is running');
});

export default app;