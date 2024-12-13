# Projekto pavadinimas

**Užduočių valdymo sistema**

## Sprendžiamo uždavinio aprašymas

Šio projekto tikslas yra sukurti užduočių valdymo sistemą, kuri padeda komandai efektyviai valdyti projektus ir užduotis. Sistema leis organizuoti užduotis į projektus ir skirstyti jas pagal projekto fazes. Tai padės sekti projekto eigą, lengviau priskirti ir valdyti užduotis bei stebėti darbų progresą.

## Sistemos paskirtis

Sistemos paskirtis yra suteikti įrankį projektų valdymui, kuris padeda komandai struktūrizuoti užduotis per skirtingas projekto fazes. Ji suteikia galimybę:

- Efektyviai valdyti projektus;
- Stebėti užduotis ir progresą skirtingose projekto fazėse;
- Užtikrinti komandinį darbą su atitinkamomis prieigos teisėmis.

## Funkciniai reikalavimai

### Projektų valdymas:

- Vartotojas gali sukurti naują projektą;
- Vartotojas gali redaguoti projekto informaciją;
- Vartotojas gali ištrinti projektą.

### Užduočių valdymas:

- Vartotojas gali sukurti naują užduotį ir priskirti ją projektui bei fazei;
- Vartotojas gali redaguoti užduoties informaciją;
- Vartotojas gali ištrinti užduotį;
- Užduotys yra rodomos pagal fazę, prie kurios jos priskirtos.

### Fazių valdymas:

- Vartotojas gali sukurti naują fazę ir priskirti ją projektui;
- Vartotojas gali redaguoti fazės informaciją;
- Vartotojas gali ištrinti fazę.

### Vartotojų valdymas:

- Administratorius turi galimybę sukurti ir valdyti visus projektus, užduotis ir fazes;
- Narys gali valdyti savo sukurtus projektus, fazes ir užduotis;
- Svečias gali tik matyti pavyzdinį projektą, fazes ir užduotis.

### Autentifikacija ir autorizacija:

- Sistema naudoja JWT autentifikaciją.

## Pasirinktų technologijų aprašymas

### Backend:

- **Programavimo kalba**: TypeScript
- **Karkasas**: NestJS
- **Duomenų bazė**: PostgreSQL

### Frontend:

- **Programavimo kalba**: TypeScript
- **Karkasas**: NextJS

### Debesų technologijos:

- **Platforma**: Railway.app

## Diegimo diagrama

<img width="782" alt="image" src="https://github.com/user-attachments/assets/f8e29ad9-a5dc-4d75-bfe3-91a8bb2e0b02" />


## API specifikacija
https://task-management-backend-production-4f99.up.railway.app/api

## Naudotojo sąsaja
https://www.figma.com/design/6kxXP3OvbMoPE6ifmJpzS1/Saitynai
