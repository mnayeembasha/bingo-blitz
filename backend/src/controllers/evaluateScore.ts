import { Request, Response, NextFunction, RequestHandler } from "express";
import { BingoAnswerModel } from "../models/BingoAnswer";
import { bingoQuestionModel } from "../models/BingoQuestion";

export const evaluateScore: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Load all questions once (using lean() for performance)
    const questions = await bingoQuestionModel.find({}).lean();
    // Build a lookup map: question text -> correct answer
    const questionAnswerMap = new Map<string, string>();
    questions.forEach((q) => {
      questionAnswerMap.set(q.text, q.answer);
    });

    // Fetch all responses
    const responses = await BingoAnswerModel.find({});

    for (let response of responses) {
      const userAnswers = response.userAnswers;
      let correctCount = 0;

      for (let ua of userAnswers) {
        const correctAnswer = questionAnswerMap.get(ua.question);
        if (!correctAnswer) {
          console.error("Question not found for text:", ua.question);
          // Optionally, skip to the next answer
          continue;
        }
        if (ua.answer === correctAnswer) {
          correctCount++;
        }
      }

      // Update the response with the computed score
      await BingoAnswerModel.updateOne(
        { _id: response._id },
        { $set: { noOfCorrectAnswers: correctCount } }
      );
    }

    res.status(200).json({ message: "Scores evaluated successfully" });
  } catch (error) {
    console.error("Error evaluating scores:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getTop30Scores = async (req: Request, res: Response) => {
    try {
      console.log("evaluating top 30....")
      const topScores = await BingoAnswerModel.find({}, { 
          teckziteId: 1, 
          submittedAt: 1, 
          noOfCorrectAnswers: 1, 
          _id: 0 
        }) // Select only required fields
        .sort({ noOfCorrectAnswers: -1, submittedAt: 1 }) // Correct sorting order
        // .limit(32); 
  
      // Format the submission time in AM/PM format with seconds
      const formattedScores = topScores.map((score) => ({
        teckziteId: score.teckziteId,
        submittedAt: new Date(score.submittedAt).toLocaleString("en-US", {
          timeZone: "UTC",
          hour12: true,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        noOfCorrectAnswers: score.noOfCorrectAnswers,
      }));
  
      res.status(200).json({ message: "Top 30 scores", data: formattedScores });
    } catch (error) {
      console.error("Error fetching top scores:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


