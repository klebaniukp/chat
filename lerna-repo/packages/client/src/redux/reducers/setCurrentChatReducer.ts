import { IChat } from '../../types/types';

export const setCurrentChatReducer = (
    state: IChat[],
    action: { type: string; payload: IChat },
) => {
    try {
        switch (action.type) {
            case 'SET_CURRENT_CHAT':
                return action.payload;
            default:
                if (state) return state;
                return {
                    _id: '',
                    name: '',
                    lastname: '',
                    email: '',
                    messages: [],
                };
        }
    } catch (error) {
        console.log(error);
    }
};
