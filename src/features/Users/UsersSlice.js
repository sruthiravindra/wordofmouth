import { USERS } from '../../app/shared/USERS';

export const selectWorkers = () => {
    return USERS.filter((user) => user.worker === true );
};

export const selectUserById = (id) => {
    return USERS.find((user) => user.id === parseInt(id));
};