// export const changeLang = (lang) => ({
//     type: 'CHANGE_LANG',
//     lang
// });

export const changeLang = function(lang) {
    console.log(lang);
    return {
        type: 'CHANGE_LANG',
        lang        
    }
}