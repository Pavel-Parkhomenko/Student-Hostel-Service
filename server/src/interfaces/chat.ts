export interface IChat {
    _id: string,
    name: string,
    messages: [
        {
            text?: string,
            user?: string,
            createdAt?: string
        }
    ]
}