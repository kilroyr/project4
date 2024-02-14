// usersService.js

import bcrypt from 'bcrypt';
import * as usersAPI from './usersAPI';

export async function signup(userData) {

  // Validate user data  
  const errors = validateSignup(userData);
  if (errors.length > 0) {
    throw errors;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create user
  const user = await usersAPI.createUser({
    ...userData, 
    password: hashedPassword
  });

  return user;

}

function validateSignup(userData) {
  const errors = [];
  // TODO: Add validation logic
  return errors;
}


export async function login(credentials) {
  
  const user = await usersAPI.getUserByEmail(credentials.email);

  // Validate user exists and compare passwords
  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    throw 'Invalid email or password';
  }

  // TODO: Create and return JWT token

}
