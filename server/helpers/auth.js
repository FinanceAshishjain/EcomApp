import bcrypt from "bcryptjs"

export const hashPassword = (password)=>{
    return new Promise((resolve, reject)=>{
    bcrypt.genSalt(10, function (err, Salt) {    
        bcrypt.hash(password, Salt, function (err, hash) {
            if (err) {
                return console.log('Cannot encrypt');
            }
            console.log(hash);
            resolve( hash);
        });
    });
    });
};

export const comparePassword = (password, hashed) => {    
    return new Promise((resolve, reject)=>{
    bcrypt.genSalt(10, function (err, Salt) {
             console.log(hashed);    
            bcrypt.compare(password, hashed,
                async function (err, isMatch) {
                    if (isMatch) {
//                        console.log('Encrypted password is: ', password);
//                        console.log('Decrypted password is: ', hashed);
                        resolve(true) ;
                    }
                    if (!isMatch) {
//                        console.log(hashed + ' is not encryption of '
//                            + password);
                            resolve(false) ;
                        }
                })
        })
    })
};
