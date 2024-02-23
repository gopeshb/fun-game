import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).send('Unauthorized access');
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send('Forbidden');
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.log('Error occurred in token verification');
        next(error);
    }
};
