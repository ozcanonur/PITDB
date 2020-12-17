import mongoose from 'mongoose';

mongoose.set('useUnifiedTopology', true);

if (process.env.DB) {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
}
