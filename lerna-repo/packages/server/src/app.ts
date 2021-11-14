import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import cookieSession from 'cookie-session';
import { userRouter } from './routes/user';

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL as string;
const PORT = process.env.PORT || 5000;
const oneDay = 86400000;

const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

app.use(
    cookieSession({
        name: 'session',
        keys: ['key1', 'key2'],
        secret: 'secret',
        maxAge: oneDay,
    }),
);

// app.use(
//     sessions({
//         secret: 'secret',
//         resave: false,
//         saveUninitialized: true,
//         cookie: {
//             maxAge: oneDay,
//             httpOnly: true,
//             secure: false,
//         },
//     }),
// );

const origin =
    process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL
        : 'http://localhost:3000';

app.use(
    cors({
        credentials: true,
        origin,
    }),
);

app.use('/user', userRouter);

mongoose
    .connect(CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server Running on: http://localhost:${PORT}`),
        ),
    )
    .catch(error => console.log(`${error} did not connect`));
