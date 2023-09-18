import bcrypt from 'bcrypt'

export async function hash(password) {
    const saltRounds = 10
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    return hashedPassword
}

export async function compare(password, hash) {
    const isMatched = await new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if(err) reject(err)
            else resolve(result)
        })
    })
    return isMatched
}