import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export default registerAs("mysql", (): TypeOrmModuleOptions => ({
    type: "mysql",
    // host: process.env.DB_HOST,
    host: "localhost",
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASES,
    synchronize: true,
    entities: [`dist/apis/**/*.entity{.ts,.js}`],
    maxQueryExecutionTime: 3000,
    poolSize: 10,
}))