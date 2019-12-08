import jwt from 'jsonwebtoken';

const jwtSecret = 'TODO:';

export const generateJwtToken = (payload: any): string => {
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 60 });
    return token;
};

export const parseJwtToken = (bearerHeaderString: string): any => {
    if (!bearerHeaderString) {
        throw new Error('No Bearer token provided');
    }
    const [_, token] = bearerHeaderString.split(' ');
    const payload = jwt.verify(token, jwtSecret);
    return payload;
};
