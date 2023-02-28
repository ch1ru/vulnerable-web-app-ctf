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

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const handleNewUser = async (req: Request, res: Response): Promise<Response<any>> => {
    
    try {
        const { user, pwd } = req.body;
    
        if(!user || !pwd) {
            return res.status(Code.BAD_REQUEST)
            .send(new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, 'Username and password are required'));
        }

        if(user === "gilgamesh" || user === "Gilgamesh") { //breaks the chalenge!
            return res.status(Code.NOT_FOUND)
            .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, 'User already exists'));
        }

        //check for duplicates
        console.log("connecting to db");
        const duplicateResult: ResultSet = await pool.query(QUERY.SELECT_USER, user);
        if(((duplicateResult[0]) as Array<any>).length > 0) {
            return res.status(Code.NOT_FOUND)
            .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "User already exists"));
        }

        //hash the password
        const hashedPass = await bcrypt.hash(pwd, 10);
        //store the new user
        let newUser: User = { username: user, password: hashedPass };
        console.log("Attempting to create user ", newUser);
        
        const result: ResultSet = await pool.query(QUERY.INSERT_USER, Object.values(newUser));

        return res.status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, "User created", newUser));
    }
    catch(err) {
        return res.status(Code.INTERNAL_SERVER_ERROR)
        .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "Internal error", {err}));

    }
}