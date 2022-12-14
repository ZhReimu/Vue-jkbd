interface Answer {
    id: string
    value: string
}

interface Subject {
    type: number
    title: string
    pic?: string
    answers: Answer[]
    correct: string,
    yourAnswer?: string
}

export type {
    Answer,
    Subject
}
