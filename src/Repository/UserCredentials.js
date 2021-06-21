export class UserCredentials {
    constructor(uid, email, userRole) {
        this.uid = uid;
        this.email = email;
        this.userRole = userRole;
        this.createdAt = new Date().toISOString();
    }

}