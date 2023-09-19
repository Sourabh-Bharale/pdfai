import { PineconeClient, Vector , utils as PineconeUtils } from "@pinecone-database/pinecone";
import { downloadFromUT } from "./ut-server";
import {PDFLoader} from 'langchain/document_loaders/fs/pdf'
import { PDFPageRequest } from "./validators/pdfPage";
import {Document,RecursiveCharacterTextSplitter} from '@pinecone-database/doc-splitter'
import { getEmbeddings } from "./embeddings";
import md5 from 'md5'
import { convertToAscii } from "./utils";



let pinecone:PineconeClient|null = null;

export const getPineconeClient = async()=>{
    if(!pinecone){
        pinecone = new PineconeClient()
        await pinecone.init({
            environment:process.env.PINECONE_ENVIRONMENT!,
            apiKey:process.env.PINECONE_API_KEY!,
        })
    }
    return pinecone
}

export async function loadUTIntoPinecone(fileKey:string){
    // 1. obtain the pdf
    console.log('downloding file')
    const file_name = await downloadFromUT(fileKey)
    if(!file_name){
        throw new Error('could not download file')
    }
    const loader = new PDFLoader(file_name);
    const pages  = (await loader.load()) as PDFPageRequest[];
    console.log('pages done',pages)

    // 2 split and segment pdf

    // before pages -> Array(13)
    const documents = await Promise.all(pages.map(prepareDocument))
    //after pages -> Array(1e4)
    console.log('done splitting documents',documents)


    // 3 vectorize and embed individual documents
    console.log('embedding documents')
    const vectors = await Promise.all(documents.flat().map(embedDocument))
    console.log('done embedding documents',vectors)


    // upload to pinecone
    console.log('connecting to pinecone')
    const client = await getPineconeClient()
    const pineconeIndex = client.Index("pdfai");
    console.log('uploading vectors into pinecone')
    // const namespace = convertToAscii(fileKey)

    // await pineconeIndex.upsert({})
    PineconeUtils.chunkedUpsert(pineconeIndex,vectors,'',10)
    console.log('done uploading vectors into pinecone')
    return documents[0]

}

async function embedDocument(doc:Document){
    try {
        const embeddings = await getEmbeddings(doc.pageContent)
        const hash = md5(doc.pageContent)

        return {
            id:hash,
            values:embeddings,
            metadata:{
                text:doc.metadata.text,
                pageNumber:doc.metadata.pageNumber,
            },
        } as Vector
    } catch (error) {
        console.log('error embedding document',error)
        throw error
    }
}

export const truncateStringByBytes = (str:string,bytes:number)=>{
    const enc = new TextEncoder()
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
}

async function prepareDocument(page:PDFPageRequest){
    let {metadata,pageContent} = page
    pageContent = pageContent.replace(/\n/g,"")
    // split docs
    const splitter = new RecursiveCharacterTextSplitter()
    const docs = await splitter.splitDocuments([
        new Document({
          pageContent,
          metadata: {
            pageNumber: metadata.loc.pageNumber,
            text: truncateStringByBytes(pageContent, 36000),
          },
        }),
      ]);
      return docs;
    }
