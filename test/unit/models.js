const { expect } = require('chai');

const ProductsModel = {
  create: () => {}
}

describe('Insere um novo produto no Banco de dados', () => {
  const product = {
    name: 'produtoExemplo',
    quantity: 999,
  }

  describe('Quando for inserido com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await ProductsModel.create(product);

      expect(response).to.be.a('object');
    });
    it('O objeto tem todas as informacoes do produto inclusive o ID criado', () => {
      const response = await ProductsModel.create(product);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity')
    });
  })
})