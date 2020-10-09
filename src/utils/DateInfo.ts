interface IInitialDateInfo {
    tomorrow: Date;
    dayAfterTomorrow: Date;
}

export const getInitialDateInfo = (): IInitialDateInfo => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
    return {
        tomorrow,
        dayAfterTomorrow,
    };
};
