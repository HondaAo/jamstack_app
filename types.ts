export type Field = {
    title: string,
    description: string,
    userId: string
}

export type Return = {
    fields: Field,
    id: number
}

export type User = {
  given_name: string,
  family_name: string,
  nickname: string,
  name: string,
  picture: string,
  locale: string,
  updated_at: string,
  sub: string
} | null;