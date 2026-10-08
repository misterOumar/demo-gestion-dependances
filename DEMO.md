# Démo : Dependabot sur un projet Next.js en retard

Projet Next.js 13 dont les dépendances ont volontairement 2 à 5 ans de retard.
Dependabot les détecte et ouvre des pull requests, que la CI vérifie.

## Point de départ (versions figées)

| Paquet      | Version déclarée | Dernière version | Type de montée | Ce que fait Dependabot             |
|-------------|------------------|------------------|----------------|------------------------------------|
| lodash      | 4.17.15          | 4.18.x           | minor          | PR groupée `petites-montees`       |
| dayjs       | 1.11.0           | 1.11.x           | patch          | PR groupée `petites-montees`       |
| classnames  | 2.3.1            | 2.5.x            | minor          | PR groupée `petites-montees`       |
| next        | 13.4.19          | 16.x             | major          | PR individuelle (faille critique)  |
| react / dom | 18.2.0           | 19.x             | major          | PR individuelle                    |
| axios       | 0.21.1           | 1.x              | major          | PR individuelle (failles high)     |

`npm audit` sur le projet : **5 vulnérabilités, dont 1 critique** (next).

## Mise en place (à faire au moins 1 jour avant la présentation)

```bash
cd demo-gestion-dependances
git init -b main && git add . && git commit -m "Projet Next.js avec dépendances anciennes"
gh repo create demo-gestion-dependances --public --source . --push

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
gh api -X PUT repos/$REPO/vulnerability-alerts        # alertes Dependabot
gh api -X PUT repos/$REPO/automated-security-fixes    # PR de correctifs de sécurité
gh repo edit $REPO --enable-auto-merge --delete-branch-on-merge

# main protégée : la CI doit être verte pour fusionner (requis par l'auto-merge)
gh api -X PUT repos/$REPO/branches/main/protection --input - <<'JSON'
{ "required_status_checks": { "strict": false, "contexts": ["build-et-tests"] },
  "enforce_admins": false, "required_pull_request_reviews": null, "restrictions": null }
JSON
```

Dependabot lance une première analyse dès qu'il voit `.github/dependabot.yml`.
Les PR arrivent en général en quelques minutes. Pour relancer à la main :
onglet **Insights → Dependency graph → Dependabot → Check for updates**.

> Dépôt public conseillé : la protection de branche (nécessaire pour
> `gh pr merge --auto`) n'est pas disponible sur un dépôt privé gratuit.

## Déroulé en direct (environ 3 min)

1. **Le manifeste** (30 s) : montrer `package.json`, puis `.github/dependabot.yml`.
   C'est la configuration de la slide 09, mot pour mot.
2. **Détecter** (30 s) : onglet *Security → Dependabot alerts*, avec la faille
   critique sur `next`. Un scanner s'arrête là.
3. **Proposer** (1 min) : onglet *Pull requests*. Ouvrir une PR majeure
   (`Bump next from 13.4.19 to 16.x`) et montrer le titre, les notes de version,
   le diff limité à `package.json` et `package-lock.json`, et la compatibilité.
4. **Vérifier** (30 s) : le check `build-et-tests` sur chaque PR.
   - PR `petites-montees` : verte, **déjà fusionnée automatiquement**
     (onglet *Closed*), sans intervention.
   - PR majeures : à relire, et la CI peut être rouge (next 16 avec react 18).
     C'est la slide 11 : « les versions majeures cassent ».
5. **Décider** (30 s) : fusionner une PR majeure verte en direct (axios par
   exemple), puis montrer que la page affiche la nouvelle version
   (`npm run dev` après `git pull`).

Phrase de transition vers la slide 11 : *« Le robot a proposé, la CI a vérifié,
mais c'est nous qui avons cliqué sur Fusionner. »*

## Plan B (pas de réseau ou PR pas encore arrivées)

Faire des captures d'écran la veille : liste des PR, une PR ouverte,
le check CI vert/rouge et l'alerte de sécurité.

## En local

```bash
npm install
npm test        # 3 tests node:test
npm run dev     # http://localhost:3000 : liste des versions déclarées
npm audit       # les failles que Dependabot va corriger
```
