import { config } from 'dotenv';
import { ProjectConfigs } from 'expresso-macchiato';
import { MyProjectConfig } from './types/generic.types';

config();

export const projectConfig: ProjectConfigs & MyProjectConfig = {
    SERVER_PORT: parseInt(process.env.SERVER_PORT ?? '3000'),
    API_URL: process.env['API_URL'],
    ERROR_FILE_PATH: process.env['ERROR_FILE_PATH'],

    DB_DIALECT: process.env.DB_DIALECT,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT ?? '5432'),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,

    MINIO_ENDPOINT: process.env['MINIO_ENDPOINT'] ?? '12.0.0.7',
    MINIO_PORT: parseInt(process.env['MINIO_PORT'] ?? '9000'),
    MINIO_SSL: process.env['MINIO_SSL'] === 'true',
    MINIO_ACCESS_KEY: process.env['MINIO_ACCESS_KEY'],
    MINIO_SECRET_KEY: process.env['MINIO_SECRET_KEY'],
};
