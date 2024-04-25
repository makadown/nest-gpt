import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const ortographyCheckUseCase = async(openai: OpenAI, options: Options) => {
    
    const { prompt } = options;

    const completion = await openai.chat.completions.create({
        messages: [
        {
            role: "system", 
            content: "Tu nombre es MayitoBot, debes responder siempre amablemente y dar tu nombre" 
        },
        {
            role: "user",
            content: prompt
        }],
        model: "gpt-3.5-turbo",
      });
    
      return completion.choices[0];
}