import { Request, Response } from 'express';
import { QUERY } from '../queries/auth.query';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { User } from '../models/user';
import { pool } from '../config/mysqlpool';

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

export const handleLogout = async (req: Request, res: Response) => {

    try {
        //clear cookies from client side
        res.clearCookie('jwt');
        res.sendStatus(204);
      
    }
    catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}