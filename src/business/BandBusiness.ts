import { IdGenerator } from "../services/IdGenerator";

import { Authenticator } from "../services/Authenticator";
import { BandDatabase } from "../data/BandDatabase";
import { Band, BandInputDTO } from "../types/Band";
import { InvalidBand, Unauthorized } from "../error/BaseError";

export class BandBusiness {

    async createBand(input: Band,token:string) {

        try {

            if(!input.name || !input.musicalGenre || !input.representative){
                throw new InvalidBand()
            }
            if(!token){
                throw new Unauthorized()
            }

            const idGenerator = new IdGenerator() ;
            const authenticator = new Authenticator();
          const userRole= authenticator.getData(token).role
          if(!userRole || userRole.toLocaleLowerCase()==="normal"){
            throw new Unauthorized()
          }
          const band:BandInputDTO={
            id:idGenerator.generate() ,
            name: input.name,
            musicalGenre: input.musicalGenre,
            representative: input.representative
          }

            const bandDatabase = new BandDatabase;
       const result=await bandDatabase.createBand(band)

         
           

           
        } catch (error: any) {
            throw new Error(error.message);
        }


    }
    public getBandByName=async(name:string):Promise<any>=>{
      try{
       
        if(!name){
          throw new Error(" invalid name")
        }
        const bandDatabase= new BandDatabase()
        const result= await bandDatabase.getBandByname(name)
        return result
      }catch(error:any){
        throw new Error(error.message);
      }


      

    }

    
}