export const signIn = (token) => ({
    type: 'SIGN_IN',
    token
});

export const signOut = () => ({
    type: 'SIGN_OUT'
});