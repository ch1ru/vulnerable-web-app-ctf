import { HttpResponse } from '../http/response';
import { Code } from '../http/code'
import { Status } from '../http/status';
import { Request, Response } from 'express';
import { QUERY } from '../queries/auth.query';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { User } from '../models/user';
import dotenv from 'dotenv';
import { pool } from '../config/mysqlpool';

dotenv.config();
const jwt = require('jsonwebtoken');

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const handleRefreshToken = async (req: Request, res: Response) => {

    try {

        const cookies = req.cookies;

        //validate request
        if(!cookies?.jwt) {
            return res.sendStatus(401);
        }

        const refreshToken = cookies.jwt;

        let foundUser: User;
        const foundUserResult: ResultSet = await pool.query(QUERY.GET_USER_FROM_TOKEN, refreshToken);

        if(((foundUserResult[0]) as Array<any>).length === 1) {
            foundUser = ((foundUserResult[0]) as Array<any>)[0];
        }
        else {
            //couldn't find user
            console.log("Couldn't find user in database");
            return res.status(Code.UNAUTHORIZED)
            .send(new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, "Unauthorized"));
        }

        //evaluate jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err: any, decoded: any) => {
                if(err || foundUser.username !== decoded.username) {
                    return res.sendStatus(403);
                }
                const accessToken = jwt.sign(
                    { "username": decoded.username },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }
                );
                res.json({ accessToken })
            }
        );        
    }
    catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}