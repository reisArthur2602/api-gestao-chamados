import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

// Função para gerar um CPF válido e único
function generateCPF(index: number): string {
  const base = `000000000${index + 1}`; // Gera CPFs simples (simulado)
  return base.slice(-11); // Garante que o CPF tenha exatamente 11 dígitos
}

// Função para gerar um telefone válido
function generatePhone(index: number): string {
  const ddd = '11'; // DDD padrão (São Paulo)
  const number = `9${(100000000 + index).toString().slice(-8)}`; // Gera um número de telefone válido
  return `${ddd}${number}`;
}

async function main() {
  // Hash da senha do usuário
  const hashedPassword = await hash('123456', 10);

  // Criação do usuário
  const user = await prisma.user.create({
    data: {
      email: 'guest@guest.com',
      password: hashedPassword,
      username: 'GuestUser',
    },
  });

  // Lista de categorias reais
  const categoryNames = [
    'Elétrica',
    'Hidráulica',
    'Jardinagem',
    'Manutenção Geral',
    'TI e Computadores',
    'Pintura',
    'Reformas',
    'Limpeza',
    'Instalações',
    'Consultoria',
  ];

  // Criação de categorias
  const categories = await prisma.category.createMany({
    data: categoryNames.map((name) => ({ name })),
  });

  console.log(`Criadas ${categories.count} categorias.`);

  // Lista de nomes reais para os clientes
  const clientNames = [
    'João Silva',
    'Maria Oliveira',
    'Carlos Souza',
    'Ana Pereira',
    'Roberto Lima',
    'Beatriz Santos',
    'Paulo Gomes',
    'Fernanda Rodrigues',
    'Gabriel Martins',
    'Juliana Alves',
    'Ricardo Dias',
    'Camila Araújo',
    'André Costa',
    'Sabrina Monteiro',
    'Fábio Ferreira',
  ];

  // Criação de clientes
  const clients = await prisma.client.createMany({
    data: clientNames.map((name, i) => ({
      name,
      email: `${name.split(' ').join('.').toLowerCase()}@example.com`,
      cpf: generateCPF(i), // Gerando CPF válido
      address: `Rua ${name.split(' ')[1]} ${i + 1}, Centro`,
      phone: generatePhone(i), // Gerando telefone válido
      userId: user.id,
    })),
  });

  console.log(`Criados ${clients.count} clientes.`);

  // Recuperar clientes e categorias para associar aos chamados
  const allClients = await prisma.client.findMany();
  const allCategories = await prisma.category.findMany();

  // Criação de ordens (chamados)
  for (let i = 0; i < 10; i++) {
    await prisma.order.create({
      data: {
        clientId: allClients[i % allClients.length].id,
        userId: user.id,
        category_id: allCategories[i % allCategories.length].id,
        description: `Chamado relacionado a ${allCategories[i % allCategories.length].name}`,
        status: i % 2 === 0, // Alterna entre aberto e fechado
      },
    });
  }

  console.log('Criados 10 chamados.');
}

main()
  .then(() => {
    console.log('Seed concluído.');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
