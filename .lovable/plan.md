

# Legal Entity Switch: KRS Immobilien GmbH → SMB Consulting UG (haftungsbeschränkt)

## Files to change

### 1. `src/pages/Impressum.tsx`
Replace all company info with SMB Consulting UG data:
- Company: SMB Consulting UG (haftungsbeschränkt)
- Address: Westerwaldstr. 146, 53773 Hennef
- Geschäftsführer: Jan Sommershoff (only one, not two)
- Phone: +49 175 1127114
- Email: info@krsimmobilien.de
- USt-ID: DE121862927
- Registergericht: Amtsgericht Köln, HRB 114170
- Remove Yannick Müller as Geschäftsführer

### 2. `src/pages/Datenschutz.tsx`
- Line 39: Replace "KRS Immobilien GmbH" → "SMB Consulting UG (haftungsbeschränkt)"
- Line 40: Update phone to +49 175 1127114, email to info@krsimmobilien.de
- Line 78: Replace "KRS Immobilien GmbH" → "SMB Consulting UG (haftungsbeschränkt)"

### 3. `src/components/layout/Footer.tsx`
- Line 56: Change copyright from `{siteData.name}` to `SMB Consulting UG (haftungsbeschränkt) – Alle Rechte vorbehalten.`

### 4. `src/data/siteData.ts`
- Email stays `info@krsimmobilien.de` (unchanged per your instructions)
- Project name "KRS Immobilien" stays as-is (it's a project reference, not the legal entity)

### 5. `src/components/seo/SEOHead.tsx`
- Update to use `siteData` instead of `photographerInfo` for organization metadata (name, keywords)

### 6. `src/components/CookieBanner.tsx`
- No explicit company name reference currently — the banner is generic. No change needed.

### Not changed
- `supabase/functions/send-contact-email/index.ts` — recipient email `j.s@krsimmobilien.de` is a contact routing detail, not a legal reference. Left as-is unless you want it changed.
- `src/data/photographer.ts` — legacy file from a template, not rendered on the main site.

