# Architecture des agents

## Schema texte

Next.js -> API Route -> n8n Webhook -> OpenAI -> IF validation -> Supabase -> Gmail/Slack -> Dashboard

## Flux patrimoine

1. L'utilisateur ouvre `/patrimoine`.
2. Le formulaire envoie un POST vers `/api/patrimoine`.
3. La route API valide email, objectif principal et description libre.
4. n8n recoit le payload via `/agent-preanalyse-patrimoniale`.
5. OpenAI produit une fiche preparatoire.
6. IF impose la validation humaine.
7. Supabase stocke dans `patrimoine_analyses`.
8. Le conseiller est notifie.

## Flux pilotage

1. L'utilisateur ouvre `/pilotage`.
2. Le formulaire envoie un POST vers `/api/pilotage`.
3. La route API valide periode et donnees facture ou contexte.
4. n8n recoit le payload via `/agent-pilotage-facturation`.
5. OpenAI detecte anomalies et priorites.
6. IF verifie anomalies ou validation humaine.
7. Supabase stocke dans `pilotage_analyses`.
8. Le responsable interne est notifie.

## Emplacement des fichiers

- Pages : `app/patrimoine/page.tsx`, `app/pilotage/page.tsx`
- Routes API : `app/api/patrimoine/route.ts`, `app/api/pilotage/route.ts`
- Composants : `components/PatrimoineForm.tsx`, `components/PilotageForm.tsx`
- Workflows : `n8n/workflows/`
- Prompts : `n8n/prompts/`
- SQL : `supabase/schema-agents.sql`

## Test local

1. Copier `.env.example` vers `.env.local`.
2. Renseigner les deux URLs de webhook n8n.
3. Importer les workflows n8n.
4. Lancer `npm run dev`.
5. Tester `http://localhost:3000/patrimoine` et `http://localhost:3000/pilotage`.
