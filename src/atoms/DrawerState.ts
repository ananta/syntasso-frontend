import { atom } from 'recoil';

const DrawerState = atom({
    key: 'drawerState',
    default: {
        isOpen: false,
    },
});

export default DrawerState;
