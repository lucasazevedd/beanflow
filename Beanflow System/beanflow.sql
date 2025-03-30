CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    razao_social VARCHAR(255),
    cnpj BIGINT UNIQUE NOT NULL,
    contato VARCHAR(255)
);

CREATE TABLE cotacoes (
    id SERIAL PRIMARY KEY,
    data_criacao DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) CHECK (status IN ('Pendente', 'Aprovado', 'Recusado')),
    prazo DATE GENERATED ALWAYS AS (data_criacao + INTERVAL '10 days') STORED,
    observacoes TEXT,
    cliente_id INT REFERENCES clientes(id) ON DELETE CASCADE
);

CREATE TABLE boletos (
    id SERIAL PRIMARY KEY,
    data_criacao DATE DEFAULT CURRENT_DATE,
    vencimento DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    cliente_id INT REFERENCES clientes(id) ON DELETE CASCADE
);

CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    prazo DATE NULL,  
    responsavel VARCHAR(255) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('Pendente', 'Em Andamento', 'Concluído')) DEFAULT 'Pendente'
);
