export const NAVDATA = [
    {
        id: 0,
        parent: 0,
        title: 'salon',
        url: '/services',
    },
    {
        id: 1,
        parent: 0,
        title: 'massage',
        url: '/services'
    },
    {
        id: 2,
        parent: 0,
        title: 'hair',
        url: '/services'
    },
    {
        id: 3,
        parent: 0,
        title: 'nails',
        url: '/services'
    },
    {
        id: 4,
        parent: 0,
        title: 'wax/thread',
        url: '/services'
    },
    {
        id: 5,
        parent: 5,
        title: 'artisan',
        url: '/services',
    {
        id: 6,
        parent: 5,
        title: 'carpentry',
        url: '/services'
    },
    {
        id: 7,
        parent: 'artisan',
        title: 'masonry',
        url: '/services'
    },
    {
        title: 'gardening',
        url: '/services'
    },
{
    id: 2,
    title: 'home repair',
    url: '/services',
    submenu: [
        {
            title: 'plumbing',
            url: '/services'
        },
        {
            title: 'electric',
            url: '/services'
        },
        {
            title: 'construction',
            url: '/services'
        }
        ]
    },
    {
        id: 3,
        title: 'cleaning/cooking',
        url: '/services',
        submenu: [
            {
                title: 'cleaning',
                url: '/services'
            },
            {
                title: 'cooking',
                url: '/services'
            }
        ]
    },
    {
        id: 4,
        title: 'driving',
        url: '/serivces',
        submenu: [
            {
                title: 'driving',
                url: '/services'
            }
        ]
    },
    {
        id: 5,
        title: 'child/pet care',
        url: '/services',
        submenu: [
            {
                title: 'child care',
                url: '/services'
            },
            {
                title: 'pet care',
                url: '/services'
            }
        ]
    }
]