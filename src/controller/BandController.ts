import { Band } from "../types/Band";
import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BaseDatabase } from "../data/BaseDatabase";


export class BandController {
    async create(req: Request, res: Response) {
        try {
            const token =req.headers.authorization as string
            const input: Band = {
                
                name: req.body.name,
                musicalGenre: req.body.musicalGenre,
                representative: req.body.representative
            }

            const bandBusiness = new BandBusiness;
             await bandBusiness.createBand(input,token);

            res.status(200).send({ message: "created band " });

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }
    async getBandByName(req: Request, res: Response) {
        try {
            const name=req.params.name
            

            const bandBusiness = new BandBusiness;
             const result= await bandBusiness.getBandByName(name);

            res.status(200).send(result);

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    

}