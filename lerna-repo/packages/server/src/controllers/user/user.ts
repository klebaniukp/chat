import { Request, Response } from 'express';
import { UserModel } from '../../models/User';
import { passwordSchema } from '../../models/Password';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../../interfaces/IUser';

const generateId = () => {
    const randomString = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return `${randomString()}-${randomString()}-${randomString()}-${randomString()}-${randomString()}-${randomString()}${randomString()}${randomString()}`;
};

export const signup = async (req: Request, res: Response) => {
    const secret = process.env.JWT_SECRET_TOKEN as string;
    const refreshToken = process.env.JWT_REFRESH_TOKEN as string;
    const specialSigns = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const { email, name, lastName, password } = req.body;
    const maxAge = 1000 * 60 * 60;

    try {
        const oldUser = await UserModel.findOne({ email: email });

        if (oldUser)
            return res
                .status(400)
                .json({ message: 'This email is already in use' });

        if (!passwordSchema.validate(password))
            return res.status(400).json({
                message:
                    'Invalid password, check length, capital letters and number appearance',
            });

        if (!specialSigns.test(password))
            return res.status(400).json({
                message: 'Invalid password, provide special sign',
            });

        const hashedPassword = await bcrypt.hash(password, 12);

        for (let i = 0; i <= 1; i++) {
            const id = generateId().toString();
            const user = await UserModel.findOne({ _id: id });

            if (!user) {
                const defFriendId = '7cfd-e11b-b4a3-ce08-1468-f4b2abffe2a8';
                const defaultFriend = await UserModel.findOne({
                    _id: defFriendId,
                });
                console.log(defaultFriend)

                if (!defaultFriend) {
                    return res.status(500).json({
                        message:
                            'Default friend not found, probably connection issue',
                    });
                }

                const friendObj = {
                    _id: defaultFriend._id,
                    friendRequestStatus: true,
                    senderId: defaultFriend._id,
                };

                const newUser: IUser = await UserModel.create({
                    _id: id,
                    email: email,
                    name: name,
                    lastName: lastName,
                    password: hashedPassword,
                    friends: [friendObj],
                });

                const newUserObjectToUpdate = {
                    _id: newUser._id,
                    friendRequestStatus: true,
                    senderId: friendObj._id,
                };

                await UserModel.findOneAndUpdate(
                    { email: 'default@friend.com' },
                    { $push: { friends: newUserObjectToUpdate } },
                );

                const token = jwt.sign(
                    { email: newUser.email, id: newUser._id },
                    secret,
                    { expiresIn: '60m' },
                );

                UserModel.findOne({ email: newUser.email })
                    .then(response => {
                        if (response) {
                            const result = {
                                _id: response._id,
                                email: response.email,
                                name: response.name,
                                lastName: response.lastName,
                                friends: response.friends,
                            };

                            return res
                                .status(200)
                                .clearCookie('token')
                                .cookie('token', token, {
                                    httpOnly: true,
                                    sameSite: 'none',
                                    secure: true,
                                    maxAge: maxAge,
                                })
                                .cookie('refreshToken', refreshToken, {
                                    httpOnly: true,
                                    sameSite: 'none',
                                    secure: true,
                                    maxAge: maxAge,
                                })
                                .json({ result });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                break;
            } else {
                break;
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const signin = async (req: Request, res: Response) => {
    const secret = process.env.JWT_SECRET_TOKEN as string;
    const refreshToken = process.env.JWT_REFRESH_TOKEN as string;
    const { email, password } = req.body;
    const maxAge = 1000 * 60 * 60;

    try {
        const oldUser = await UserModel.findOne({ email: email });

        if (!oldUser)
            return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            oldUser.password,
        );

        if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { email: oldUser.email, id: oldUser._id },
            secret,
            { expiresIn: '60m' },
        );

        UserModel.findOne({ email: email })
            .then(response => {
                if (response) {
                    const user = {
                        _id: response._id,
                        email: response.email,
                        name: response.name,
                        lastName: response.lastName,
                        friends: response.friends,
                    };

                    console.log('everything ok, logged in');
                    console.log(user);

                    return res
                        .status(200)
                        .clearCookie('token')
                        .cookie('token', token, {
                            httpOnly: true,
                            sameSite: 'none',
                            secure: true,
                            maxAge: maxAge,
                        })
                        .cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            sameSite: 'none',
                            secure: true,
                            maxAge: maxAge,
                        })
                        .json({ result: user, message: 'Logged in' });
                }
            })
            .catch(error => {
                console.log(error);
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: (err as Error).message });
    }
};

