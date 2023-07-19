import { USERS } from '../../app/shared/USERS';

export const selectWorkers = () => {
    return USERS.filter((user) => user.worker === true );
};