import { createClient } from "@supabase/supabase-js"

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzeWZteWdscGJha3hicXJyaXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NzUyNTQsImV4cCI6MjA5MDI1MTI1NH0.ujsFbtNiXwtNZzI_LR8IcFJVhdqWHMs-vZnxv-nFsV0"

const supabaseUrl = "https://rsyfmyglpbakxbqrriwo.supabase.co"


const supabase = createClient(supabaseUrl, supabaseKey)


export default function uploadFile(file){
    return new Promise(
        (resolve,reject)=>{

            if(file==null){
                reject("No file provided")
                return
            }

            const timestamp = new Date().getTime()
            const fileName = timestamp + "-"+file.name


            supabase.storage.from("images").upload(fileName,file,{
                upsert: false,
                cacheControl: 3600

            }).then(
                ()=>{
                    const url = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                    resolve(url)
                }).catch(
                    (error)=>{
                        reject("failed to upload file: " + error.message)
                    }
                )
            

            })

}
