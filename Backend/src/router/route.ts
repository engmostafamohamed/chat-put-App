import express, { Request, Response } from 'express';
import ApiController from '../controller/controller';
const apiRouter=express.Router()
apiRouter.post('/data',async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.body;
        const apiController=new ApiController()
        const result=await apiController.searchInWordFile(searchTerm)
        return res.status(200).json({message:'data return successfully',result})
    }
    catch(error){
        return res.status(500).json(error)
    }
})
export default apiRouter