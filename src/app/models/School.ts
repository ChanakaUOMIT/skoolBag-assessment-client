export interface School {
    _id: string,
    name: string,
    address: Address,
    registedStudents: number
}

interface Address {
    street: string,
    suburb: string,
    postcode: string,
    state: string
}