import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

if(process.env.NODE_ENV === 'test'){
    dotenv.config({path:'.env.test'});
}else{
    dotenv.config();
}

export const sequelize=new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host:process.env.DB_HOST as string,
        port:Number(process.env.DB_PORT),
        dialect:'postgres',
        logging:false,
        define:{
            underscored:true,
            timestamps:true
        }
    }
);

export const connectDB=async()=>{
    try{
        await sequelize.authenticate();
        console.log('DB connected');
    }catch(error){
        console.log('DB connection failed:',error);
        process.exit(1);
    }
}
