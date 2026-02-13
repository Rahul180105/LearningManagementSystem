import app from './app'
import { connectDB, sequelize } from './config/database.config';


const PORT =process.env.PORT||3001;
const startServer = async()=>{
    try{
        await connectDB();
        await sequelize.sync();

app.listen(PORT,()=>{
    console.log(`Auth service at port ${PORT}`);
});
    }catch(error){
        console.log('failed to start server:',error);
        process.exit(1);
    }
};
startServer()