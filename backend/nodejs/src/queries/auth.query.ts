export const QUERY = {
    INSERT_USER: 'INSERT INTO credentials (username, password) VALUES (?, ?)',
    SELECT_USER: 'SELECT * FROM credentials WHERE username = ?',
    STORE_REFRESH_TOKEN: 'REPLACE INTO tokens (username, token) VALUES (?, ?)',
    GET_USER_FROM_TOKEN: 'SELECT * FROM tokens WHERE `token` = ?',
    DELETE_TOKEN: 'DELETE FROM tokens WHERE `username` = ?'
}