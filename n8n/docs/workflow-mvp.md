# Workflow n8n MVP

Le workflow MVP contient exactement 5 etapes conceptuelles :

1. **Webhook - recevoir le brief** : point d'entree POST appele par l'API Next.js.
2. **Set - normaliser les champs** : met les champs au format attendu par l'agent.
3. **OpenAI - analyser et generer la fiche projet** : produit une fiche projet JSON.
4. **IF - verifier validation humaine** : detecte les sujets sensibles ou signales par l'IA.
5. **Gmail - envoyer la fiche au referent** : notifie le referent interne lorsque la validation est necessaire.

Le webhook repond immediatement a Next.js pour conserver un MVP simple. La version avancee pourra ajouter une reponse detaillee, le stockage Supabase et un dashboard de suivi.
