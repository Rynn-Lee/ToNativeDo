export type todosData = {
  id: number,
  text: string
}

export type cardData = {
  id: number,
  title: string,
  todos: todosData[]
}