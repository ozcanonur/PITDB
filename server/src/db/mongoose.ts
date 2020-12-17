import mongoose from 'mongoose';

mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
