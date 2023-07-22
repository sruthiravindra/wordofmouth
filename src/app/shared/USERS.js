import profilePicDefault from '../assets/img/profile-default.png'

export const USERS = [
    {
        id: 0,
        username: 'sruthiR',
        password: '12345',
        firstName: 'Sruthi',
        lastName: 'Ravindran',
        email: '',
        phone: '',
        profilePic: '../assets/profile-default.png',
        worker: false,
        rating: 5,
        contacts: [1, 2]
    },
    {
        id: 1,
        username: 'effieG',
        password: '56789',
        firstName: 'Effie',
        lastName: 'Guenther',
        email: '',
        phone: '',
        profilePic: '../assets/profile-default.png',
        worker: false,
        rating: 5,
        contacts: [0, 2]
    },
    {
        id: 2,
        username: 'urshilaR',
        password: 'abcdefg',
        firstName: 'Urshila',
        lastName: 'Rana',
        email: '',
        phone: '',
        profilePic: '../assets/profile-default.png',
        worker: false,
        rating: 5,
        contacts: [2, 3]
    },
    {
        id: 3,
        username: 'renuD',
        password: 'hijklmn',
        firstName: 'Renu',
        lastName: '',
        email: '',
        phone: '',
        profilePic: profilePicDefault,
        worker: true,
        rating: 4.4,
        contacts: [0, 1, 2, 3, 5],
        services: [14, 15, 16, 17, 1, 4]
    },
    {
        id: 4,
        username: 'ayushR',
        password: '555555',
        firstName: 'Ayush',
        lastName: 'Rana',
        email: '',
        phone: '',
        profilePic: profilePicDefault,
        worker: true,
        rating: 3.7,
        contacts: [1, 2, 3],
        services: [10, 11, 8]
    },
    {
        id: 5,
        username: 'taniyaG',
        password: '77777',
        firstName: 'Taniya',
        lastName: 'Goyal',
        email: '',
        phone: '',
        profilePic: profilePicDefault,
        worker: true,
        rating: 2.5,
        contacts: [1, 2, 3, 4],
        services: [1, 2, 3, 4]
    },
    {
        id: 6,
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        profilePic: profilePicDefault,
        worker: false,
        rating: 5,
        contacts: []
    }
];