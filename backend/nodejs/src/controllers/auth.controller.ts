import { HttpResponse } from '../http/response';
import { Code } from '../http/code';
import { Status } from '../http/status';
import { Request, Response } from 'express';
import { QUERY } from '../queries/auth.query';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { User } from '../models/user';
import dotenv from "dotenv";
import { pool } from '../config/mysqlpool';

const bcrypt = require('bcrypt');
dotenv.config();

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const handleLogin = async (req: Request, res: Response) => {
    
    try {
        const { user, pwd } = req.body;

        //validate request
        if(!user || !pwd) {
            return res.status(Code.BAD_REQUEST)
            .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Username and password are required'));
        }

        //locate user
        let foundUser: User;
        const foundUserResult: ResultSet = await pool.query(QUERY.SELECT_USER, user);

        if(((foundUserResult[0]) as Array<any>).length === 1) {
            foundUser = ((foundUserResult[0]) as Array<any>)[0];
        }
        else {
            return res.status(Code.UNAUTHORIZED)
            .send(new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, "Unauthorized"));
        }

        //evaluate password
        const match = await bcrypt.compare(pwd, foundUser.password);
        if(match) {

                //JWT 
                //Sign access token
                const jwt = require('jsonwebtoken');
                const accessToken = jwt.sign(
                    {"username": foundUser.username },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '6h' }
                );
                //sign refresh token
                const refreshToken = jwt.sign(
                    {"username": foundUser.username },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '6h' }
                );


                res.cookie('jwt', refreshToken, { httpOnly: false, maxAge: 6 * 60 * 60 * 1000 });
                return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, 'User is logged in', {accessToken: accessToken}));
        }
        else {
            return res.status(Code.UNAUTHORIZED)
            .send(new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, 'Unauthorized'));
        }
    }
    catch(err) {
        console.log(err);
    }
}