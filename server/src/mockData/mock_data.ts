export interface User {
}

export interface Person extends User {
    name: string;
    age: number;
}


export const user: Array<Person> = [
    {
        age: 22,
        name: "Lewis"
    },
    {
        age: 28,
        name: "Williams"
    },
]
