export const stringRandom = (length = 9) => {
    return Math.random().toString(36).substring(2, length);
};
