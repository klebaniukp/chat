import { Request, Response } from 'express';
import { UserModel } from '../../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateFriendList = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

        if (jwt.decode(token) === null) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const filter = { _id: userId };
        const user = await UserModel.findOne(filter);

        if (!user) {
            return res
                .status(404)
                .json({ message: 'Invalid jwt token, user not found' });
        }

        const friendList = user.friends.map(friend => friend.email);

        if (friendList.length === 0) {
            return res.status(200).json({
                message: 'No friends',
                friendList: [
                    { email: 'Forever', name: 'Your', lastname: 'Friend' },
                ],
            });
        }

        const filledFriendList = UserModel.find({
            email: { $in: friendList },
        });

        filledFriendList
            .then(users => {
                const convertedUsers = users.map(user => {
                    return {
                        email: user.email,
                        name: user.name,
                        lastName: user.lastName,
                    };
                });
                return res.status(200).json({ friendList: convertedUsers });
            })
            .catch(err => {
                return res
                    .status(500)
                    .json({ message: (err as Error).message });
            });
    } catch (err) {
        res.status(501).json({ message: (err as Error).message });
    }
};