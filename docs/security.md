# Securite

- Ne jamais exposer les cles API dans le code ou cote client.
- Ne jamais publier `.env`, `.env.local` ou des credentials n8n.
- Ne pas laisser l'agent prendre de decision financiere, juridique ou contractuelle.
- Toujours imposer une validation humaine pour les sujets sensibles.
- Ne pas envoyer de donnees sensibles dans Slack ou email sans filtrage.
- Journaliser les traitements importants dans la version avancee.
- Limiter les droits Supabase avec des politiques RLS adaptees avant production.

## Limites du POC

Le POC sert a demontrer le cadrage assiste par IA. Il ne remplace pas une validation interne, un conseil juridique, un conseil financier ou une validation contractuelle.
