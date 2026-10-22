// Point d'entrée du bundle Vite : styles globaux + API publique.
// Les types sont générés depuis index.ts uniquement (tsconfig.lib.json),
// pour que l'import CSS n'apparaisse pas dans les .d.ts publiés.
import "./styles/tokens.css";

export * from "./index";
