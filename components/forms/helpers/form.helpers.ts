/* eslint-disable function-paren-newline */
/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { ObjectId } from 'mongoose';
import { IUser } from '../../../models/UserModel';
import { BASE_URL } from '../../../utils/constants';

export const submitRegisterUser = async (values: IUser) => {
  try {
    return await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((res) =>
      res.status === 201
        ? true
        : res.status === 409
        ? res.json()
        : 'Could not create account'
    );
  } catch (e: any) {
    return console.error(e);
  }
};

export const submitEditUser = async (
  userId: ObjectId | undefined,
  values: object
) => {
  try {
    return await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((res) =>
      res.status === 201
        ? true
        : res.status === 404
        ? res.json()
        : "Couldn't update user"
    );
  } catch (e: any) {
    return console.error(e);
  }
};
