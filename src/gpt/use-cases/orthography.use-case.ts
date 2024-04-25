interface Options {
    prompt: string;
}

export const ortographyCheckUseCase = async(options: Options) => {
    
    const { prompt } = options;
    return {
        prompt: prompt + ' jijijiji',
        apikey: process.env.OPEN_API_KEY?? 'NO API KEY FOUND'
    }


}