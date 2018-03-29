class TokenInfo {
    constructor(token) {
        try{
            function b64DecodeUnicode(str) {
                return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                }).join(''))
            }

            let tokenPayloadBase64Encoded = token.split('.')[1];
            let tokenPayloadBase64Decoded = b64DecodeUnicode(tokenPayloadBase64Encoded);
            let jsonObject = JSON.parse(tokenPayloadBase64Decoded);

            this.expiresIn = new Date(jsonObject.exp * 1000);
            this.userName = jsonObject.FullName;
            this.department = jsonObject.Department ? jsonObject.Department : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
            this.post = jsonObject.Post ? jsonObject.Post : 'Lorem ipsum dolor';
        } catch(e) {
            this.expiresIn = new Date();
            this.userName = '';
        }        
    }

    get isLogged() {
        var result = this.expiresIn > new Date();
        return result;
    }
}

export default TokenInfo;