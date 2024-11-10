import { IClient } from "../models/client/IClient";
import { ICreateClient } from "../models/client/ICreateClient";
import { IDeleteClient } from "../models/client/IDeleteClients";
import { IFindByCPF } from "../models/client/IFindByCPF";
import { IFindByEmail } from "../models/client/IFindByEmail";
import { IFindbyId } from "../models/client/IFindById";
import { IFindByPhone } from "../models/client/IFindByPhone";
import { IListClients } from "../models/client/IListClients";
import { IUpdateClient } from "../models/client/IUpdateClient";

export interface IClientRepository {
  findByEmail({ email }: IFindByEmail): Promise<IClient | null>;
  findByCPF({ cpf }: IFindByCPF): Promise<IClient | null>;
  findByPhone({ phone }: IFindByPhone): Promise<IClient | null>;
  findById({ id }: IFindbyId): Promise<IClient | null>;
  listClients({ userId }: IListClients): Promise<IClient[] | []>;
  create({
    address,
    cpf,
    email,
    name,
    phone,
    userId,
  }: ICreateClient): Promise<IClient>;
  remove({ id }: IDeleteClient): Promise<IClient>;
  update({ address, id, phone }: IUpdateClient): Promise<IClient>;
}
