export type todosData = {
  id: number,
  text: string,
  done: boolean
}

export type cardData = {
  id: number,
  title: string,
  todos: todosData[]
}