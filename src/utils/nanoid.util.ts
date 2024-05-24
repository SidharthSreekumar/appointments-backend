export default async function getAlphaNumString(length: number = 20) {
  const { customAlphabet } = await import("nanoid");
  const nanoid = customAlphabet('abcdefghijklmnopqrst0123456789', length);
  return nanoid().toLowerCase();
}
