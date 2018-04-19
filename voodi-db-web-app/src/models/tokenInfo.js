import { b64utoutf8, KJUR } from 'jsrsasign'

class TokenInfo {
    constructor(token) {
        try{
            let tokenPayloadBase64Encoded = token.split('.')[1];
            let jsonObject = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(tokenPayloadBase64Encoded));

            this.expiresIn = new Date(jsonObject.exp * 1000);
            this.userName = jsonObject.FullName;
            this.department = jsonObject.Department ? jsonObject.Department : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
            this.post = jsonObject.Post ? jsonObject.Post : 'Lorem ipsum dolor';
            this.role = jsonObject.Role;

        } catch(e) {
            this.expiresIn = new Date();
            this.userName = '';
            this.department = '';
            this.post = '';
            this.role = 'Guest';
        }        
    }

    get isLogged() {
        return this.expiresIn > new Date();
    }
}

export default TokenInfo;