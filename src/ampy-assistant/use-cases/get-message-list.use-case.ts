import OpenAI from "openai";

interface Options {
    threadId: string
}

export const getMessageListUseCase = async (openai: OpenAI, options: Options) => {

    const { threadId } = options;

    const messageList = await openai.beta.threads.messages.list(threadId);

    const messages = messageList.data.map( (message: OpenAI.Beta.Threads.Messages.Message) => {
        return ({
            role: message.role,
            content: message.content.map(content => (content as any).text.value )    
        });        
    });
    // envío los mensajes desde el primero a el último
    return messages.reverse();
}