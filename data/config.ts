import dotenv from 'dotenv';
dotenv.config();

export default class config{
    public static Unicorn_URL = process.env.Unicorn_URL!;
    public static Unicorn_Email = process.env.Unicorn_Email!;
    public static Unicorn_Password = process.env.Unicorn_Password!;

}