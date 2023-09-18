import axios from 'axios';
import fs from 'fs';
import path from 'path';
export async function downloadFromUT(fileKey:string){
    try{
        const response = await axios.get(`https://utfs.io/f/${fileKey}`,{responseType:'arraybuffer'})
        console.log("download successful")
        if(response.status === 200){
            const tmpDir = "/tmp"
            const file_name = `pdf-${Date.now()}.pdf`
            const file_path = path.join(tmpDir,file_name)
            if (!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir);
              }
            fs.writeFileSync(file_path,Buffer.from(response.data))
            return file_path
        }else{
            console.error("failed to download file from utfs.io",response.status)
            return null;
        }
    }catch(err){
        console.error("error downloading file",err)
        // https://utfs.io/f/cc51ec1d-ef3d-4096-9374-fa4651d640eb-iw4tng.pdf
    }
}