import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateUserData } from '../../api';
import { DataField } from '../molecules/DataField';
import { FriendListModel } from '../molecules/FriendListModel';
import { IUserData } from '../../types/types';
import { UserFriendListDisplay } from './UserFriendListDisplay';
import profile from '../../img/profilePicture.png';

export const FullCard = (props: {
    headerValue: string;
    footerValue: string;
    firstname: string;
    lastname: string;
    email: string;
    img: string;
    imgHeight: string;
}) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [isUpdateBtn, setIsUpdateBtn] = useState(false);
    const [display, setDisplay] = useState(true);

    const dispatch = useDispatch();
    const userData: IUserData = useSelector(
        (state: RootState) => state.userData,
    );

    const updateUserDataAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const form: HTMLFormElement = e.currentTarget;
            if (
                form !== null &&
                form.firstname !== null &&
                form.email !== null &&
                form.lastname !== null
            ) {
                if (form.firstname.value.toString() === '')
                    form.firstname.value = userData.name;

                if (form.lastname.value.toString() === '')
                    form.lastname.value = userData.lastName;

                if (form.email.value.toString() === '')
                    form.email.value = userData.email;

                const updatedUser: {
                    name: string;
                    email: string;
                    lastname: string;
                } = {
                    name: form.firstname.value.toString(),
                    email: form.email.value.toString(),
                    lastname: form.lastname.value.toString(),
                };

                updateUserData(updatedUser)
                    .then(res => {
                        if (res.status === 200) {
                            const userData: IUserData = {
                                id: res.data.result._id,
                                email: res.data.result.email,
                                name: res.data.result.name,
                                lastName: res.data.result.lastName,
                                friends: res.data.result.friends,
                                isUserLoggedIn: true,
                            };

                            dispatch({
                                type: 'SET_USER_DATA',
                                payload: userData,
                            });
                            setIsDisabled(true);
                            setDisplay(true);
                            setIsUpdateBtn(false);
                        } else if (res.status === 201) {
                            alert(
                                res.data.message + ' change to antoher email',
                            );
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={e => updateUserDataAction(e)}>
            <div
                className='d-flex  card text-center'
                style={{ fontSize: '2vh' }}>
                <div className='card-header'>
                    <h1>{props.headerValue}</h1>
                </div>
                <div className='d-flex justify-content-center card-body'>
                    <img
                        src={props.img}
                        alt='profile'
                        style={{ height: '30vh' }}
                    />
                    <div className='d-flex justify-content-between flex-column flex-column w-50 h-full pt-2'>
                        <DataField
                            value={props.firstname}
                            label={'Firstname'}
                            isDisabled={isDisabled}
                            name={'firstname'}
                        />
                        <DataField
                            value={props.lastname}
                            label={'Lastname'}
                            isDisabled={isDisabled}
                            name={'lastname'}
                        />
                        <DataField
                            value={props.email}
                            label={'Email'}
                            isDisabled={isDisabled}
                            name={'email'}
                        />
                    </div>

                    {/* this friend list will be generated in another component after validation updated */}
                    {/* <div
                        className='overflow-auto w-25'
                        style={{ height: '30vh' }}>
                        <UserFriendListDisplay />
                    </div> */}
                </div>
                <div className='card-footer text-muted'>
                    <i className='ms-5'>{props.footerValue}</i>
                    <div className='float-end'>
                        {display ? (
                            <button
                                type='button'
                                className='btn btn-outline-info me-2'
                                onClick={() => {
                                    setIsDisabled(false);
                                    setDisplay(false);
                                    setIsUpdateBtn(true);
                                }}>
                                edit
                            </button>
                        ) : (
                            <button
                                type='button'
                                className='btn btn-outline-info me-2 d-none'
                                onClick={() => {
                                    setIsDisabled(false);
                                    setDisplay(false);
                                    setIsUpdateBtn(true);
                                }}>
                                edit
                            </button>
                        )}
                        {isUpdateBtn ? (
                            <button
                                type='submit'
                                className='btn btn-outline-primary'>
                                update
                            </button>
                        ) : (
                            <button
                                className='btn btn-outline-primary'
                                disabled>
                                update
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};
