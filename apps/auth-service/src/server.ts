import app from './app'
import { connectDB, sequelize } from '@lms/shared-db';
import '@lms/shared-db';
import {User } from '@lms/shared-db';

console.log('seqlixe instance:',sequelize.constructor.name);
console.log('seqlixe instance:',User.sequelize===sequelize);
console.log("user associations:",Object.keys(User.associations));

const PORT =process.env.PORT||3001;
const startServer = async()=>{
    try{
        await connectDB();
        await sequelize.sync({force:true});

app.listen(PORT,()=>{
    console.log(`Auth service at port ${PORT}`);
});
    }catch(error){
        console.log('failed to start server:',error);
        process.exit(1);
    }
};
startServer()