import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken';

export const sendFriendRequest = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const token: string = req.cookies.token;

        if (process.env.JWT_SECRET_TOKEN != undefined)
            if (jwt.verify(token, process.env.JWT_SECRET_TOKEN)) {
                const decodedToken = JSON.stringify(jwt.decode(token));
                const userTokenId = JSON.parse(decodedToken).id;

                const searchedUser = await UserModel.findOne({
                    _id: userId, //set name of userId in frontend form
                }).lean();

                if (!searchedUser) {
                    res.status(404).json({ message: 'User not found' });
                }

                await UserModel.findOneAndUpdate(
                    { _id: userTokenId },
                    {
                        $push: {
                            friends: {
                                _id: userId,
                                friendRequestStatus: 'pending',
                            },
                        },
                    },
                );
                await UserModel.findOneAndUpdate(
                    { _id: userId },
                    {
                        $push: {
                            friends: {
                                _id: userTokenId,
                                friendRequestStatus: 'pending',
                            },
                        },
                    },
                );
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }

        res.status(200).json({ message: 'Friend request sent' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};