import mongoose,{Schema} from "mongoose";
   
export interface BingoQuestion{
    id:string;
    topic:string;
    text:string;
    options:string[],
    difficulty:string,
    answer:string
}

const bingoQuestionSchema = new Schema<BingoQuestion>({
    id:{
        type:String,
        required:true,
        unique:true
    },
    topic:String,
    text:String,
    options:String,
    difficulty:String,
    answer:String,
})

export const bingoQuestionModel = mongoose.model<BingoQuestion>("BingoQuestion",bingoQuestionSchema);