import "./globals.css";

export const metadata = {
  title: "Démo gestion des dépendances",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
