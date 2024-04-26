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
            content: `
            Te serán provistos textos con posibles errores ortográficos y gramaticales,
            Las palabras usadas deben existir en el diccionario de la Real Academia Española.

            Debes responder en formato JSON,
            tu tarea es corregirlos y retornar información con soluciones,
            también debes dar un porcentaje de acierto para el usuario,

            Si no hay errores, debes de retornar un mensaje de felicitaciones.

            Estructura de salida:
            {
                userScore: number,
                errors: string[], // ['error -> solución']
                message: string, // Usa emojis y texto para el usuario.
            }

            `
        },
        {
            role: "user",
            content: prompt
        }],
        // model: "gpt-4",
        model: "gpt-3.5-turbo-1106",        
        temperature: 0.3,
        max_tokens: 150,
        response_format: { // this one is not supported by gpt-4
            type: "json_object"
        }
      });
    
      return JSON.parse( completion.choices[0].message.content);
}