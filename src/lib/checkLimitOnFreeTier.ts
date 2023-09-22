import { utapi } from 'uploadthing/server';

async function deleteUTFile(fileKey: string) {
  try {
    // Call the UploadThing API to delete the file
    await utapi.deleteFiles(fileKey);
    console.log(`File with fileKey ${fileKey} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting file with fileKey ${fileKey}:`, error);
    throw error; // You can choose to handle the error as per your application's requirements
  }
}

export default deleteUTFile;