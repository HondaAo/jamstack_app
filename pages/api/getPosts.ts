import { table, minifyRecords } from './utils/Airtable'

export default async(_: any, res: { statusCode: number; json: (arg0: { msg: string; }) => void; }) => {
    try{
    const records = await table.select({}).firstPage();
    const minififyRecords = minifyRecords(records)
    res.statusCode = 200;
    res.json(minififyRecords);
    }catch(err){
        res.statusCode = 500;
        res.json({ msg: "Error"})
    }
}