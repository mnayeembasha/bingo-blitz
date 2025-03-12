import { BingoQuestion, bingoQuestionModel } from "../models/BingoQuestion";
import {Request,Response} from "express";
export const addBingoQuestions = async (req:Request,res:Response)=>{
    const {questions} = req.body;

    try{
        for(let question of questions){
            await bingoQuestionModel.create(question);
        }
        console.log("questions added successfully");
    }catch(error){
        return res.status(500).json({message:" Server Error",error});
    }
}