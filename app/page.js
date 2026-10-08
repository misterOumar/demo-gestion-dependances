import pkg from "../package.json";
import { formatDate } from "../lib/utils";

// Affiche les versions réellement installées : après chaque fusion
// d'une PR Dependabot, la page reflète la nouvelle version.
export default function Home() {
  const deps = Object.entries(pkg.dependencies);

  return (
    <main>
      <p className="eyebrow">Architecture logicielle avancée · démo</p>
      <h1>Nos dépendances</h1>
      <p className="muted">Page générée le {formatDate(new Date())}</p>
      <table>
        <thead>
          <tr>
            <th>Paquet</th>
            <th>Version déclarée</th>
          </tr>
        </thead>
        <tbody>
          {deps.map(([name, version]) => (
            <tr key={name}>
              <td><code>{name}</code></td>
              <td><code>{version}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted">
        {deps.length} lignes déclarées dans package.json. Dependabot surveille le reste.
      </p>
    </main>
  );
}
