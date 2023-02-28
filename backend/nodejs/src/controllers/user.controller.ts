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
const jwt = require('jsonwebtoken');

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const getUser = async (req: Request, res: Response): Promise<any> => {
    
    try {

        const candidatejwt = req.query.jwt;

        let isAdmin = false;
        jwt.verify(
            candidatejwt,
            process.env.REFRESH_TOKEN_SECRET,
            (err: any, decoded: any) => {
                if(err) {
                    console.log("invalid jwt");
                    return res.sendStatus(403);
                }
                else {
                    if(decoded.username === "gilgamesh") {
                        isAdmin = true;
                    }
                    return res.status(Code.OK)
                    .send(new HttpResponse(Code.OK, Status.OK, 'user', {name: decoded.username, isAdmin: isAdmin}));
                }
            }
        ); 
    }
    catch(err) {
        console.log(err);
        return res.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "Internal error", {err}));

    }
}