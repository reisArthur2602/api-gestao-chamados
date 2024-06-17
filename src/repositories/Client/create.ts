import { db } from '../../database/Client';

import { ClientData, ClientProps } from '../../models/client';

export const CreateClientRepository = async (
  data: ClientProps
): Promise<ClientData> => {
  return await db.client
    .create({
      data,
    })
    .then((res) => res)
    .catch(() => {
      throw new Error('Email/CPF/Telefone já está em uso');
    });
};
