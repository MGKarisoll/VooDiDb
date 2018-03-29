// export const signIn = (token) => ({
//     type: 'SIGN_IN',
//     token
// });

export const signIn = function(token) {
    console.log(token);
    return {
        type: 'SIGN_IN',
        token
    }
}

export const signOut = () => ({
    type: 'SIGN_OUT'
});