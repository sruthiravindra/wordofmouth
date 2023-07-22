import { SERVICES } from '../../app/shared/SERVICES';

export const selectAllNav = () => {
    return SERVICES;
};

export const selectParentNav = () => {
    return SERVICES.filter((nav) => nav.parent === nav.id);
};

export const selectSubmenu = (id) => {
    return SERVICES.filter((nav) => nav.parent === parseInt(id) && nav.parent !== nav.id);
};

export const selectNavById = (id) => {
    return SERVICES.find((navItem) => navItem.id === parseInt(id));
};

export const selectServiceTitleById = (serviceIds) => {
    return serviceIds.map((id) => {
        return SERVICES[id].title
    })
};
