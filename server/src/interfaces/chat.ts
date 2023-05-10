export interface IChat {
    name: string,
    messages: [
        {
            text?: string,
            user?: string,
            createdAt?: string
        }
    ]
}