# Architecture

## Schema textuel

Utilisateur interne
-> Interface Next.js
-> Route API `/api/submit-brief`
-> Webhook n8n
-> Normalisation des donnees
-> LLM OpenAI compatible
-> Verification validation humaine
-> Notification Gmail ou SMTP
-> Supabase dans la version avancee

## Flux MVP

1. Utilisateur saisit un brief dans Next.js.
2. Next.js envoie le brief a n8n.
3. n8n normalise les donnees.
4. n8n appelle le LLM.
5. n8n detecte si validation humaine necessaire.
6. n8n envoie une notification.
7. Supabase pourra stocker l'historique dans la version avancee.

## Version avancee

La version avancee ajoute :

- Supabase pour stocker briefs, fiches projet et journaux d'audit ;
- Slack pour notifier les canaux internes non sensibles ;
- HubSpot pour rattacher certains projets aux comptes ou opportunites ;
- WooCommerce pour cadrer les besoins lies aux parcours d'achat ;
- dashboard Next.js pour consulter l'historique, les statuts et les validations.
