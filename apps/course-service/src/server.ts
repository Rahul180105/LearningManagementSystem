import app from './app.ts';
import * as dotenv from 'dotenv';

if(process.env.NODE_ENV==='test'){
    dotenv.config({path:".env.test"})
}else{
    dotenv.config()
}

const PORT = process.env.PORT || 3003;
app.listen(PORT,()=>{
    console.log(`Course Service running on port:${PORT}`);
})