import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 4000,
    MONGODB_URL: "mongodb://localhost:27017/bimenu",
    JWT_SECRET: process.env.JWT_SECRET
};
