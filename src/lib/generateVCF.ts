
import vCardsJS from 'vcards-js';

export interface ContactData {
  name?: string;
  phone?: string;
  email?: string;
  organization?: string;
  address?: string;
}

export const generateVCF = (contacts: ContactData[]): string => {
  const vcards = contacts.map(contact => {
    const vCard = vCardsJS();
    
    if (contact.name) {
      const nameParts = contact.name.trim().split(' ');
      vCard.firstName = nameParts[0] || '';
      vCard.lastName = nameParts.slice(1).join(' ') || '';
    }
    
    if (contact.phone) {
      vCard.cellPhone = contact.phone;
    }
    
    if (contact.email) {
      vCard.email = contact.email;
    }
    
    if (contact.organization) {
      vCard.organization = contact.organization;
    }
    
    if (contact.address) {
      vCard.homeAddress.label = 'Home Address';
      vCard.homeAddress.street = contact.address;
    }
    
    return vCard.getFormattedString();
  });

  return vcards.join('\n');
};

export const generateSingleVCF = (contact: ContactData): string => {
  return generateVCF([contact]);
};

export const downloadVCF = (vcfContent: string, filename: string = 'contacts.vcf') => {
  const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
