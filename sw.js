# HTiSA Duaal Leren – To The Rescue 📱

## Bestanden

```
htisa-pwa/
├── index.html      → De volledige app
├── manifest.json   → PWA-configuratie (naam, icoon, kleuren)
├── sw.js           → Service worker (offline werking)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## Online zetten (gratis, 5 minuten)

### Optie A – Netlify Drop (aanbevolen, geen account nodig)
1. Ga naar https://app.netlify.com/drop
2. Sleep de volledige map `htisa-pwa` op de pagina
3. Klaar! Je krijgt een link zoals `https://amazing-name-123.netlify.app`

### Optie B – GitHub Pages
1. Maak een gratis account op https://github.com
2. Maak een nieuwe repository aan: `htisa-rescue`
3. Upload alle bestanden
4. Ga naar Settings → Pages → Deploy from branch: main
5. App staat live op `https://jouwgebruikersnaam.github.io/htisa-rescue`

## Installeren op iPhone (iOS)
1. Open de app-link in **Safari**
2. Tik op het **Deel-icoon** (vierkant met pijl omhoog)
3. Kies **"Zet op beginscherm"**
4. Tik op **"Voeg toe"**
→ App verschijnt als icoon op het startscherm

## Installeren op Android
1. Open de app-link in **Chrome**
2. Er verschijnt automatisch een banner: **"Voeg toe aan startscherm"**
3. Of: tik op de drie puntjes → "App installeren"
→ App verschijnt als icoon op het startscherm

## Offline werking
De app werkt volledig **zonder internet** na de eerste keer laden.
Alle inhoud wordt gecached door de service worker.

## Eigen domein (optioneel)
Wil je de app op een eigen adres zoals `rescue.htisa.be`?
→ Koppel je domein aan Netlify via de DNS-instellingen.
