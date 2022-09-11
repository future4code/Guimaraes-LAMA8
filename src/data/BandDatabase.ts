import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import {  BandInputDTO } from "../types/Band";
import { Console } from "console";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_bandas";

  public async createBand(
    band:BandInputDTO
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id:band.id,
          name: band.name,
          music_genre: band.musicalGenre,
          responsible: band.representative
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public  getBandByname=async(name:string): Promise<any>=>{

    try {
      const result=await this.getConnection().from("lama_bandas").where({name})

      return result[0]
      
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }




  }

  

}
