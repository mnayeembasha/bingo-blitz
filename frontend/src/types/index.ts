export interface User {
    teckziteId:string,
    name?:string,
    phone?:string
}

export interface Question {
    id:string,
    topic:string,
    text:string,
    options:string[],
    explanation:string,
    correctAnswer:number
}