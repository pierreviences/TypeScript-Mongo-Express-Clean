export function validateNameAndEmail(
  name: string | undefined,
  email: string | undefined
) {
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

export function validateUserId(userId: string) {
  if (!userId) {
    return {
      success: false,
      error: "User ID is required",
    };
  }
  return {
    success: true,
  };
}
