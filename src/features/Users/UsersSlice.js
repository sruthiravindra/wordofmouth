import { USERS } from '../../app/shared/USERS';

export const selectWorkers = () => {
    return USERS.filter((user) => user.worker === true );
};

export const selectUserByEmailPassword = ({email, password})=>{
    return USERS.filter((user)=> user.email === email && user.password === password);
}