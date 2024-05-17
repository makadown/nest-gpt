/**
 * Esta es la estructura de la respuesta de openAI cuando se crea una instancia de Run.
 * No creo que se use en este proyecto pero quiero tenerla como referencia a futuro por si cambia.
 */
export interface IRunUseCaseResponse {
    id:                    string;
    object:                string;
    created_at:            number;
    assistant_id:          string;
    thread_id:             string;
    status:                string;
    started_at:            null;
    expires_at:            number;
    cancelled_at:          null;
    failed_at:             null;
    completed_at:          null;
    required_action:       null;
    last_error:            null;
    model:                 string;
    instructions:          string;
    tools:                 any[];
    tool_resources:        Metadata;
    metadata:              Metadata;
    temperature:           number;
    top_p:                 number;
    max_completion_tokens: null;
    max_prompt_tokens:     null;
    truncation_strategy:   TruncationStrategy;
    incomplete_details:    null;
    usage:                 null;
    response_format:       string;
    tool_choice:           string;
}

export interface Metadata {
}

export interface TruncationStrategy {
    type:          string;
    last_messages: null;
}

/*
Ejemplo: 

{
    "id": "run_tPNEGNW7uwehSahzvgHJD6uE",
    "object": "thread.run",
    "created_at": 1715971133,
    "assistant_id": "asst_hRsqcEEDwxyzvKOxH2dVJwAI",
    "thread_id": "thread_V8Hfs69UPQLkBF4rI9mXjRlR",
    "status": "queued", // este estatus cambia con el tiempo, lo ideal es esperar hasta que cambie a 'completed'.
    "started_at": null,
    "expires_at": 1715971733,
    "cancelled_at": null,
    "failed_at": null,
    "completed_at": null,
    "required_action": null,
    "last_error": null,
    "model": "gpt-3.5-turbo-16k",
    "instructions": "Tu nombre es Ampy, un abogado para una tienda en línea.\n\nTu trabajo es responder preguntas sobre el uso de la página basado en sus términos y condiciones de uso que te proporcionaré en el PDF adjunto.\n\nSe amable y cordial siempre.\n\nSita los títulos de los términos en tus respuestas si es posible.\n\nSi no conoces la respuesta, puedes escalar el caso a: \"Mario Serrano <isc.serrano.flores@google.com>\" o al teléfono de asistencia +1.800.123.3212.\n\nLos prompts deben ser saludos de bienvenida cordiales.\n\nLas respuestas deben de ser cortas simulando unos mensajes de una conversación de chat.\n\nPregunta el nombre de la persona para tratarlo de forma más personal.\n\nSi conoces el nombre de la persona, por favor escríbelo.",
    "tools": [],
    "tool_resources": {},
    "metadata": {},
    "temperature": 1,
    "top_p": 0.75,
    "max_completion_tokens": null,
    "max_prompt_tokens": null,
    "truncation_strategy": {
        "type": "auto",
        "last_messages": null
    },
    "incomplete_details": null,
    "usage": null,
    "response_format": "auto",
    "tool_choice": "auto"
}

*/