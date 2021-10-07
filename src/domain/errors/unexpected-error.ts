export class UnexpectedError extends Error {
  constructor () {
    super('Algum erro ocorreu. Tente novamente em breve.')
    this.name = 'UnexpectedError'
  }
}
