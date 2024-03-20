const Sequelize = require('sequelize');

// Configurando a conexão com o banco de dados
const sequelize = new Sequelize('aula4', 'aluno', 'ifpecjbg', {
dialect: 'mysql', // ou o dialect do seu banco de dados
host: '127.0.0.1', // ou o host do seu banco de dados
});

// Testando a conexão
sequelize.authenticate()
.then(() => {
console.log('Conexão bem-sucedida com o banco de dados.');
})
.catch(err => {
console.error('Erro ao conectar ao banco de dados:', err);
});

const categorias = sequelize.define('Categorias', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

const produtos = sequelize.define('Produtos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2)
    },
    id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Categorias',
            key: 'id'
        }
    },
    disponivel: {
        type: Sequelize.BOOLEAN
    }
})

const clientes = sequelize.define('Clientes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false 
    },
    endereco: {
        type: Sequelize.STRING(255)
    },
    telefone: {
        type: Sequelize.STRING(20)
    }
})

const pedidos = sequelize.define('Pedidos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Clientes',
            key: 'id'
        }
    },
    data_pedido: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING(50)
    }
})

const itensPedidos = sequelize.define('ItensPedido', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_pedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'Pedidos',
            key: 'id'
        }
    },
    id_produto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'Produtos',
            key: 'id'
        }
    },
    quantidade: {
        type: Sequelize.INTEGER
    },
    preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
})

sequelize.sync()
    .then(() => {
        console.log('modelos sincronizados com o banco');
    })
    .catch(err => {
        console.error('erro ao sincronizar', err);
    })


module.exports = {
    sequelize,
    categorias,
    produtos,
    clientes,
    pedidos,
    itensPedidos
}