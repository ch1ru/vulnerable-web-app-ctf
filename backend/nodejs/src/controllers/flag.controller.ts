import { HttpResponse } from '../http/response';
import { Code } from '../http/code';
import { Status } from '../http/status';
import { Request, Response } from 'express';
import { QUERY } from '../queries/auth.query';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { User } from '../models/user';
import dotenv from "dotenv";
import { pool } from '../config/mysqlpool';

dotenv.config();
const jwt = require('jsonwebtoken');

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getFlag = async (req: Request, res: Response): Promise<any> => {
    try {

        const candidatejwt = req.query.jwt;

         //validate request
         if(!candidatejwt) {
            return res.sendStatus(401);
        }

        //evaluate jwt
        let flag;
        jwt.verify(
            candidatejwt,
            process.env.REFRESH_TOKEN_SECRET,
            (err: any, decoded: any) => {
                if(err || decoded.username !== "gilgamesh") {
                    return res.sendStatus(403);
                }
                else {
                    flag = process.env.FLAG;
                    return res.status(Code.OK)
                    .send(new HttpResponse(Code.OK, Status.OK, 'Your flag', {flag: flag}));
                }
            }
        ); 

        
    }
    catch(error: unknown) {
        console.log(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'Internal error'));
    }
}