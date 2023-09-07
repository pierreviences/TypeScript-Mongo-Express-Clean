export function validateNameAndEmail(name: string, email: string) {
  if (!name || !email) {
    return {
      success: false,
      error: "Name and email are required",
    };
  }
  return {
    success: true,
  };
}
