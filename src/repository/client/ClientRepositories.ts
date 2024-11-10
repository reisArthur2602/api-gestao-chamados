import { db } from '../../database/Client';
import { IClient } from '../../domain/models/client/IClient';
import { ICreateClient } from '../../domain/models/client/ICreateClient';
import { IDeleteClient } from '../../domain/models/client/IDeleteClients';
import { IFindByCPF } from '../../domain/models/client/IFindByCPF';
import { IFindByEmail } from '../../domain/models/client/IFindByEmail';
import { IFindbyId } from '../../domain/models/client/IFindById';
import { IFindByPhone } from '../../domain/models/client/IFindByPhone';
import { IListClients } from '../../domain/models/client/IListClients';
import { IUpdateClient } from '../../domain/models/client/IUpdateClient';

import { IClientRepository } from '../../domain/repository/IClientRepository';

class ClientRepository implements IClientRepository {
    async findByEmail({ email }: IFindByEmail): Promise<IClient | null> {
        const client = await db.client.findUnique({ where: { email } });
        return client;
    }

    async findByCPF({ cpf }: IFindByCPF): Promise<IClient | null> {
        const client = await db.client.findUnique({ where: { cpf } });
        return client;
    }

    async findByPhone({ phone }: IFindByPhone): Promise<IClient | null> {
        const client = await db.client.findUnique({ where: { phone } });
        return client;
    }

    async findById({ id }: IFindbyId): Promise<IClient | null> {
        const client = await db.client.findUnique({ where: { id } });
        return client;
    }

    async listClients({ userId }: IListClients): Promise<IClient[] | []> {
        const clients = await db.client.findMany({ where: { userId } });
        return clients;
    }

    async remove({ id }: IDeleteClient): Promise<IClient> {
        const client = await db.client.delete({ where: { id } });
        return client;
    }

    async create({
        address,
        cpf,
        email,
        name,
        phone,
        userId,
    }: ICreateClient): Promise<IClient> {
        const client = await db.client.create({
            data: { address, cpf, email, name, phone, userId },
        });
        return client;
    }

    async update({ address, id, phone }: IUpdateClient): Promise<IClient> {
        const client = await db.client.update({
            where: { id },
            data: { address, phone },
        });
        return client;
    }
}

export default ClientRepository;
