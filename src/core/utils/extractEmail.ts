export const extractNameFromEmail = (email: any): string => {
  const atIndex = email?.indexOf('@');
  if (atIndex > 0) {
    return email.substring(0, atIndex);
  }
  return email; // Return the whole email if '@' is not found
};
