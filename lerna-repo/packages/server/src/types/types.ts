import e from 'express';

export interface IResUser {
    _id?: string;
    email: string;
    lastName: string;
    name: string;
    password?: string;
    friends?: IUserFriend[] | [];
}

export interface IFriend {
    email: string;
    name: string;
    lastName: string;
}

export interface IUser {
    _id: string;
    email: string;
    name: string;
    lastName: string;
    password: string;
    friends: IUserFriend[];
}

export interface IUserFriend {
    _id: string;
    friendRequestStatus: null | boolean;
    senderId: string;
}

export interface IIdOnlyFriendList {
    _id: string;
}

export interface IFriendReqStatus {
    friendRequestStatus: null | boolean;
}

export interface ISearchResult {
    _id: string;
    email: string;
    name: string;
    lastName: string;
    friendRequestStatus: null | boolean;
}

export interface IFriendList {
    [key: string]: {
        _id: string;
        friendRequestStatus: null | boolean;
        senderId: string;
    };
}
