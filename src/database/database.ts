import mongoose from 'mongoose';

let database: mongoose.Connection;

export function connect(): void {
    if (database) {
        return;
    }

    const uri = 'mongodb://127.0.0.1:27017/digivice';

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    database = mongoose.connection;

    database.once('open', async () => console.log('Connected to database'));
    database.on('error', () => console.log('Error connecting to database'));
}

export function disconnect(): void {
    if (!database) {
        return;
    }
    mongoose.disconnect();
}
