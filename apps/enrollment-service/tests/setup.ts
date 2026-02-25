import { sequelize } from "@lms/shared-db";

beforeAll(async()=>{
    await sequelize.sync({force:true});
})

afterAll(async()=>{
    await sequelize.close();
})