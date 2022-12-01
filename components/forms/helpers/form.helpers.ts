/* eslint-disable function-paren-newline */
/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { ObjectId } from 'mongoose';
import { ILog } from '../../../models/LogModel';
import { IUser } from '../../../models/UserModel';

// Submit helpers
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
    return await fetch(`/api/users/${userId}`, {
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

export const submitAddLog = async (values: ILog) => {
  try {
    return await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((res) => res);
  } catch (e: any) {
    return console.error(e);
  }
};

export const submitEditLog = async (
  logId: ObjectId | undefined,
  values: object
) => {
  try {
    return await fetch(`/api/logs/${logId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((res) =>
      res.status === 201
        ? true
        : res.status === 404
        ? res.json()
        : "Couldn't update log"
    );
  } catch (e: any) {
    return console.error(e);
  }
};

// Date helpers

export const newDateWithFormat = () => {
  const date = new Date().toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return date;
};

export const dateToValidFormat = (date: Date) => {
  if (date === undefined) {
    return undefined;
  }
  const dateString = JSON.stringify(date);
  const validDate = dateString.substring(1, 11);
  return validDate;
};
