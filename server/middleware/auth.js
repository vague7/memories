import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const isCustomAuth = token?.length < 500;

        let decodedData;

        if (token) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            console.log("google auth nhi hai lodu");
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;