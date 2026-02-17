import app from './app';
import { connectDB, sequelize } from '@lms/shared-db';

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`User service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();