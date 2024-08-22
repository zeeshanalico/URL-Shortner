import { z } from 'zod';

const getCurrentDateISO = () => new Date().toISOString().split('T')[0];

export const urlGenerateformSchema = z.object({
  original_url: z.string().min(1, "URL is required").url("Invalid URL"),
  expiration_date: z.string().min(1, 'expiry date can\'t be empty')
    .refine(dateStr => {
      const expirationDate = new Date(dateStr);
      const currentDate = new Date(getCurrentDateISO());
      currentDate.setHours(0, 0, 0, 0);
      return expirationDate >= currentDate;
    }, {
      message: "Expiration date must be greater than or equal to today's date",
    }),
  url_type: z.string().min(1, "Type is required"),
  tag_name: z.string().optional(),
  url_id: z.string().optional(),
});
