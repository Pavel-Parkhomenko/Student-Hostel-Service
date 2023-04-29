export interface IChat {
    messages: [
        {
            who: Who,
            when: string,
            message: string
        }
    ]
}

interface Who {
    id: string,
    firstName: string,
    secondName: string,
}