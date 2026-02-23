import app from './app.ts';

const PORT = process.env.PORT || 3003;
app.listen(PORT,()=>{
    console.log(`Course Service running on port:${PORT}`);
})