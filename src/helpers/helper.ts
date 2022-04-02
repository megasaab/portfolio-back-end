import { AuthUser, User } from "../model/models"

class Helper {

    constructor() {}

    convertUser(user: AuthUser): User {
        return {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          } as User
    
    }
}



export const HelperClass = new Helper();