import Posteingang from './Posteingang';

/**
 * Produktseite "Postautomatisierung".
 *
 * Eigene Route (`/postautomatisierung`), die die bestehende Posteingang-
 * Landingpage als Inhalt einbindet. So bleibt die Startseite unberührt
 * und das Produkt hat eine klar benannte, eigenständige URL.
 */
export default function Postautomatisierung() {
  return <Posteingang />;
}
