import { Subject } from "../types/x-exam"
import { SubjectType } from "../types/x-exam-enums"

const mockData = [
    {
        type: SubjectType.JUDGE,
        title: '测试题目',
        pic: 'https://sucimg.itc.cn/sblog/jdN42qbpXY1',
        answers: [
            {
                id: '√',
                value: '√',
            },
            {
                id: '×',
                value: '×',
            }],
        correct: '√'
    },
    {
        type: SubjectType.SELECTION,
        title: '测试题目 2',
        answers: [
            { id: 'A', value: '我是 A 答案嗷' },
            { id: 'B', value: '我是 B 答案嗷' },
            { id: 'C', value: '我是 C 答案嗷' },
            { id: 'D', value: '我是 D 答案嗷' },
        ],
        correct: 'A'
    },
    {
        type: SubjectType.SELECTION,
        title: '测试题目 3',
        answers: [
            { id: 'A', value: '我是 A 答案嗷' },
            { id: 'B', value: '我是 B 答案嗷' },
            { id: 'C', value: '我是 C 答案嗷' },
            { id: 'D', value: '我是 D 答案嗷' },
        ],
        correct: 'B'
    },
    {
        type: SubjectType.SELECTION,
        title: '测试题目 4',
        answers: [
            { id: 'A', value: '我是 A 答案嗷' },
            { id: 'B', value: '我是 B 答案嗷' },
            { id: 'C', value: '我是 C 答案嗷' },
            { id: 'D', value: '我是 D 答案嗷' },
        ],
        correct: 'C'
    }
]

const getSubjects: () => Promise<Subject[]> = async () => {
    return mockData
}

export {
    getSubjects
}