import { IClient } from '../models/client/IClient';
import { ICreateClient } from '../models/client/ICreateClient';
import { IFindByCPF } from '../models/client/IFindByCPF';
import { IFindByEmail } from '../models/client/IFindByEmail';
import { IFindByPhone } from '../models/client/IFindByPhone';

export interface IClientRepository {
    findByEmail({ email }: IFindByEmail): Promise<IClient | null>;
    findByCPF({ cpf }: IFindByCPF): Promise<IClient | null>;
    findByPhone({ telefone }: IFindByPhone): Promise<IClient | null>;

    create({
        address,
        cpf,
        email,
        name,
        telefone,
        userId,
    }: ICreateClient): Promise<IClient>;
}

// async findByEmailCpfOrTelefone(identifier: string) {
//     return await prisma.client.findFirst({
//       where: {
//         OR: [
//           { email: identifier },
//           { cpf: identifier },
//           { telefone: identifier },
//         ],
//       },
//     });
//   }
// }
