import { NAVDATA } from '../../shared/NavData';

export const selectAllNav = () => {
    return NAVDATA;
};

export const selectNavById = (id) => {
    return NAVDATA.find((navItem) => navItem.id === parseInt(id));
};
