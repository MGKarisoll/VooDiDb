class TokenInfo {
    constructor(token) {
        try{
            let tokenPayloadBase64Encoded = token.split('.')[1];
            let tokenPayloadBase64Decoded = atob(tokenPayloadBase64Encoded);
            let jsonObject = JSON.parse(tokenPayloadBase64Decoded);

            this.expiresIn = new Date(jsonObject.exp * 1000);
            this.userName = jsonObject.FullName;
            this.department = jsonObject.Department ? jsonObject.Department : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
            this.post = jsonObject.Post ? jsonObject.Post : 'Lorem ipsum dolor';

            console.log(this);
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