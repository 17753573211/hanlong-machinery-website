/** International format, digits only. Example: 8613800000000 */
export const WHATSAPP_NUMBER = (process.env.WHATSAPP_NUMBER ?? "12512299070").replace(/\D/g, "");
export const WHATSAPP_URL = `http://wa.me/${WHATSAPP_NUMBER}`;
