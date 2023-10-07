import bcryptjs from "bcryptjs";
export default async function hashedPassword(password: string) {
  // hash passwd
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
}
