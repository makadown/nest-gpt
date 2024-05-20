import OpenAI from "openai";

interface Options {
    threadId: string;
    assistantId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
    const { threadId, assistantId = 'asst_DXv35K20YUZtD2nb9Tdl2pMX'} = options;
    const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
        // instructions: // OJO! esto sobre escribe el asistente, no usarlo aqui.
    });
    return run;
}