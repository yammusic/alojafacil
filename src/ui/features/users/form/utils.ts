import type { User } from '@/domain/db/features/User/model'
import { DateTime } from 'luxon'

import { hashPassword } from '@/domain/utils/crypto/encoder'
import type { UserFormValues } from './props-types'

export const mapUserToValues = (user: User): UserFormValues => {
  return {
    id: user?.id,
    username: user?.username,
    email: user?.email,
    firstName: user?.info?.firstName ?? '',
    lastName: user?.info?.lastName ?? '',
    avatar: user?.info?.avatar,
    documentType: user?.info?.documentType ?? '',
    documentNumber: user?.info?.documentNumber ?? '',
    gender: user?.info?.gender ?? '',
    roles: user?.roles?.map((r: any) => r.id) ?? [],
    dateOfBirth: (
      user?.info?.dateOfBirth
      ? DateTime.fromISO(user?.info?.dateOfBirth as string)
      : user?.info?.dateOfBirth as string
    ),
    phoneNumber: user?.info?.phoneNumber ?? '',
    countryId: user?.info?.countryId as number,
    cityId: user?.info?.cityId as number,
    address: user?.info?.address ?? '',
  }
}

export const mapValuesToUser = (values: UserFormValues): Partial<User> => {
  const { id, username, email, password, roles, ...info } = values
  delete info.stateId

  return {
    id,
    username,
    email,
    password: hashPassword(password as string),
    roles: roles as any,
    info: {
      ...info,
      dateOfBirth: values.dateOfBirth,
    } as any,
  }
}
