import { BandBusiness } from "../src/business/BandBusiness";
import { InvalidBand } from "../src/error/BaseError";
import { Band } from "../src/types/Band"

describe("Teste no método create  do bandbusiness",()=>{
    test("Objeto com nome vazio ",async()=>{
        expect.assertions(1)
        try{
            const token =""
            const input:Band={
                name: "",
                musicalGenre: "rock",
                representative:"carlos"
             }
             
              const bandBusiness= new BandBusiness()
             const result = await bandBusiness.createBand(input,token)
             
              
        }catch(error:any){
            expect(error.message).toEqual(`"Invalid Band: inform "name", "musicalGenre" and "representative"`)
        }
    })
    test("Objeto com token unválido ",async()=>{
        expect.assertions(1)
        try{
            const token =""
            const input:Band={
                name: "l",
                musicalGenre: "rock",
                representative:"car"
             }
             
              const bandBusiness= new BandBusiness()
             const result = await bandBusiness.createBand(input,token)
             expect(result).toBe(undefined)
              
        }catch(error:any){
            expect(error.message).toEqual(`"unauthorized user : `)
        }
    })
    test("Objeto com propriedades corretas ",async()=>{
        expect.assertions(1)
        try{
            const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzOGUyNDJjLWMyNWUtNDg0MC1iMzc5LWQzZmUxNGI3MjhmZiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY2MjkxNzAwMSwiZXhwIjoxNjYyOTE3NjAxfQ.ioofWhETX-gveG-eRUSRQelgqit_bZE2R8D5I1o4URc"
            const input:Band={
                name: "l",
                musicalGenre: "rock",
                representative:"car"
             }
             
              const bandBusiness= new BandBusiness()
             const result = await bandBusiness.createBand(input,token)
             expect(result).toBe(undefined)
              
        }catch(error:any){
            console.log(error.message)
        }
    })
})