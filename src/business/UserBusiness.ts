import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { InvalidEmail, InvalidUser, InvalidUserLogin } from "../error/BaseError";

export class UserBusiness {

    async createUser(user: UserInputDTO) {

        try {
            if(!user.email || !user.name|| !user.password){
                throw new InvalidUser();
                
            }
            if(!user.email.includes("@")){
                throw new InvalidEmail()
            }
            if(!user.role){
                user.role="normal"

            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(user.password);

            const userDatabase = new UserDatabase();
            await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

            const authenticator = new Authenticator();
            const accessToken = authenticator.generateToken({ id, role: user.role });

            return accessToken;
        } catch (error: any) {
            throw new Error(error.message);
        }


    }

    async getUserByEmail(user: LoginInputDTO) {

       try{
        if(!user.email || !user.password){
            throw new InvalidUserLogin();            
        }
        if(!user.email.includes("@")){
            throw new InvalidEmail()
        }
        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
       }catch (error: any) {
        throw new Error(error.message);
    }
    }
}