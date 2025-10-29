import bcrypt from "bcryptjs";

export class Encryptor {
  async encrypt(pass: string) {
    return await bcrypt.hash(pass, 10);
  }

  async compare(pass: string, hashedPass: string) {
    const normalizedHash = hashedPass.replace(/^\$2y\$/, "$2a$");
    return await bcrypt.compare(pass, normalizedHash);
  }
}
