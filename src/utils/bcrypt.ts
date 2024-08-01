import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hash(rawPassword, salt);
}
