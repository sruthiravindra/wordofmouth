import { NAVDATA } from '../../app/shared/SERVICES';

export const selectAllNav = () => {
    return NAVDATA;
};

export const selectParentNav = () => {
    return NAVDATA.filter((nav) => nav.parent === nav.id);
};

export const selectSubmenu = (id) => {
    return NAVDATA.filter((nav) => nav.parent === parseInt(id));
};

export const selectNavById = (id) => {
    return NAVDATA.find((navItem) => navItem.id === parseInt(id));
};
