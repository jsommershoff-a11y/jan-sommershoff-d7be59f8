

# Fix: Doppelter `<p>`-Tag in Datenschutz.tsx

## Problem
Zeile 78 in `src/pages/Datenschutz.tsx` enthält verschachtelte `<p>`-Tags mit dupliziertem Text:
```html
<p>...nicht mit personenbezogenen Daten verknüpft und <p>Die im Rahmen...</p></p>
```

## Fix
Zeile 78 ersetzen durch einen einzigen, korrekten `<p>`-Tag:
```tsx
<p>Die im Rahmen der Analyse eingegebenen Inhalte werden nicht dauerhaft gespeichert, nicht mit personenbezogenen Daten verknüpft und nicht automatisch an die SMB Consulting UG (haftungsbeschränkt) oder Dritte übermittelt.</p>
```

## Scope
- 1 Datei, 1 Zeile

