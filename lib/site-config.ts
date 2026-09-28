export const siteConfig = {
  brand: "AbbeyPress",
  founder: "AbbeyPress",
  email: "YOUR_EMAIL@example.com",
  whatsapp: "YOUR_WHATSAPP_NUMBER",
  whatsappDisplay: "WhatsApp",
  location: "Nigeria",
} as const;

export function whatsappUrl(message: string) {
  const number = siteConfig.whatsapp.replace(/[^0-9]/g, "");
  return number.startsWith("YOUR") ? "#" : `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(subject: string, body: string) {
  if (siteConfig.email.includes("YOUR_")) return "#";
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
