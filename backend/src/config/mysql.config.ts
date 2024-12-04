import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/apis/users/user.entity';


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
    // entities: [UserEntity],
    maxQueryExecutionTime: 3000,
    poolSize: 10,
    logging: true,
}))