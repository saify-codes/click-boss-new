import mysql from "mysql2/promise";
import { compare, hash } from "./hash";

const pool = await mysql.createPool({
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
})
export async function query(query, value = []) {
    try {
        const connection = await pool.getConnection()
        const [result] = await connection.execute(query, value)
        connection.release();
        return result
    } catch (error) { console.warn("MYSQL ERROR: ", error) }

}
export async function userExistsWithEmail(email) {
    const [user] = await query('select id from users where email = ?', [email])
    return user ? true : false

}
export async function getUserWithEmail(email) {
    const [user] = await query('select id, name, email, image, social_login, role from users where email = ?', [email])
    return user

}
export async function userExistsWithEmailPass(email, password) {
    
    const [user] = await query('select * from users where email = ?', [email])
    if (user) {
        // comparing hash password
        const match = await compare(password, user.password)
        return match
    }
}
export async function getUserWithEmailPass(email, password) {
    
    const [user] = await query('select * from users where email = ?', [email])
    if (user) {
        // comparing hash password
        const match = await compare(password, user.password)
        return match && user
    }
}
export async function getAllUsers() {
    const user = await query('select id, name, email, image, role from users where role != "ADMIN"')
    return user
}
export async function createUser(name, email, password, image) {
    // check for existing user
    const [user] = await query('select * from users where email = ?', [email])
    if (!user) {
        // check if password exist otherwise its scoial login
        if (password) {
            const hashPassword = await hash(password)
            query('insert into users(name,email,password) values(?,?,?)', [name, email, hashPassword])
        }
        else query('insert into users(name,email,image,social_login) values(?,?,?,?)', [name, email, image, true])
        return { status: true, msg: 'user created' }
    }
    return { status: false, msg: 'user email already exists' }
}
export async function updatePassword(email, password) {

    const hashPassword = await hash(password)
    query('update users set password = ? where email = ?', [hashPassword, email])
    return {msg: 'password updated' }
}
export async function updateName(email, name) {

    query('update users set name = ? where email = ?', [name, email])
    return {msg: 'name updated' }
}
