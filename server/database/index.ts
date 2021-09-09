import mongoose from 'mongoose';

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017';

export default function connectDb() {
  mongoose.connect(dbUrl, {}, (err) => {
    if (err) console.log(err);
    else console.log('> Connected to database');
  });
}
