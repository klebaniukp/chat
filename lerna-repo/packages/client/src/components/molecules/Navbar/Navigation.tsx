import React from 'react';
import { Button } from '../../atoms/Button/Button';

export const Navigation = () => {
    return (
        <>
            <div
                className={`position-absolute w-50 d-flex align-items-center justify-content-center card border-2 m-3 bg-light`}
                style={{
                    fontSize: 'large',
                    left: '50%',
                    top: '45%',
                    transform: 'translate(-50%, -50%)',
                }}>
                <div className={'d-flex flex-column m-2'}>
                    <Button
                        type={'button'}
                        value={'Go to chat'}
                        height={'15vh'}
                        width={'20vw'}
                        link={'/chat'}
                        fontSize={'xxx-large'}
                    />
                    <hr />
                    <div className={'d-flex margin'}>
                        <Button
                            type={'button'}
                            value={'Login'}
                            height={'10vh'}
                            width={'20vw'}
                            link={'/Auth'}
                            fontSize={'x-large'}
                        />
                    </div>
                    <hr />
                </div>
            </div>
        </>
    );
};

//useless comp for now
