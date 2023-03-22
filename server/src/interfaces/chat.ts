interface Employee {
    _id: string,
    firstName: string,
    secondName: string,
    middleName: string,
    role: "mentor" | "main",
    chats?: Array<Chat>
}

export interface Chat {
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