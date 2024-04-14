const calculaValor = require('../src/calcula-valor')

describe('calcularMontante', () => {
  test('com uma prestação o montante é igual ao capital', () => {
    // operação
    const montante = calculaValor.calcularMontante(100, 0.0175, 1)

    // resultado ou comportamento esperado
    expect(montante).toBe(100)
  })

  test('com 4 prestações o montante é acrescido de juros', () => {
    // operação
    const montante = calculaValor.calcularMontante(500, 0.025, 4)

    // resultado ou comportamento esperado
    // expect(montante).toBeCloseTo(538.45);
    expect(montante).toBe(538.45)
  })
})

describe('arredondar', () => {
  test('Arredondar em duas casas decimais', () => {
    const resultado = calculaValor.arredondar(538.4453124999998)
    expect(resultado).toBe(538.45)
  })

  test('1.005 deve retornar 1.01', () => {
    const resultado = calculaValor.arredondar(1.005)
    expect(resultado).toBe(1.01)
  })
})

describe('calcularPrestacoes', () => {
  test('O número de parcelas é igual ao número de prestações', () => {
    // premissas
    const numeroPrestacoes = 6

    // operação
    const prestacoes = calculaValor.calcularPrestacoes(200, numeroPrestacoes)

    // resultado esperado
    expect(prestacoes.length).toBe(numeroPrestacoes)
  })

  test('Uma única prestação, o valor é igual ao montante', () => {
    // premissas
    const numeroPrestacoes = 1

    // operação
    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)

    // resultado esperado
    expect(prestacoes[0]).toBe(50)
  })

  test('duas prestações, o valor é igual a metade do montante', () => {
    // premissas
    const numeroPrestacoes = 2

    // operação
    const prestacoes = calculaValor.calcularPrestacoes(50, numeroPrestacoes)

    // resultado esperado
    expect(prestacoes[0]).toBe(25)
    expect(prestacoes[1]).toBe(25)
    expect(prestacoes[0] + prestacoes[1]).toBe(50)
  })

  test('Valor da soma das prestações deve ser igual ao montante com duas casas decimais', () => {
    // premissas
    const numeroPrestacoes = 3
    const montante = 100

    // operação
    const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)

    // resultado esperado
    expect(prestacoes.length).toBe(numeroPrestacoes)
    const soma = calculaValor.arredondar(prestacoes[0] + prestacoes[1] + prestacoes[2])
    expect(soma).toBe(calculaValor.arredondar(montante))

    for (let i = 0; i < prestacoes.length - 1; i++) {
      const j = i + 1
      expect(prestacoes[i]).toBeGreaterThanOrEqual(prestacoes[j])
    }
  })

  test('desafio semi-final', () => {
    // premissas
    const numeroPrestacoes = 3
    const montante = 101.994

    const prestacoes = calculaValor.calcularPrestacoes(montante, numeroPrestacoes)

    // resultado esperado
    expect(prestacoes.length).toBe(numeroPrestacoes)
    const soma = calculaValor.arredondar(prestacoes[0] + prestacoes[1] + prestacoes[2])
    expect(soma).toBe(calculaValor.arredondar(montante))
  })
})
