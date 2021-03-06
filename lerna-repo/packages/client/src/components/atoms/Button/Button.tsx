import React from 'react';
import { Link } from 'react-router-dom';

export const Button = (props: {
    value: string;
    height: string;
    link: string;
    width: string;
    fontSize: string;
    type: 'button' | 'submit' | 'reset';
}) => {
    return (
        <Link to={props.link}>
            <button
                className='btn btn-primary m-3 btn-lg vh-5'
                type={props.type}
                style={{
                    height: props.height,
                    width: props.width,
                    fontSize: props.fontSize,
                }}>
                {props.value}
            </button>
        </Link>
    );
};
