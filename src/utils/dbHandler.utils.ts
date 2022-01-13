import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongoServer =  MongoMemoryServer.create();

export const dbConnect = async () => {
    const uri = (await mongoServer).getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindandModify: false,
    };

    await mongoose.connect(uri);
}

export const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await (await mongoServer).stop()
};
