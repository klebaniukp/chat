import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { UserModel } from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateFriendList = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

        if (jwt.decode(token) === null) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        console.log(`userId: ${userId}`);

        const filter = { _id: userId };
        const user = await UserModel.findOne(filter);

        if (!user) {
            return res
                .status(404)
                .json({ message: 'Invalid jwt token, user not found' });
        }

        const friendList = user.friends.map(friend => friend._id);

        const filledFriendList = await UserModel.find({
            _id: { $in: friendList },
        });

        res.status(200).json({ friendList: filledFriendList });
    } catch (err) {
        res.status(501).json({ message: (err as Error).message });
    }
};
