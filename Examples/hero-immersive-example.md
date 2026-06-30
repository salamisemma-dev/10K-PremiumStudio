# Voorbeeld — discovery → template → mapping (Hero-Immersive)

Een ingevulde discovery, de templatekeuze die eruit volgt, en de mapping naar de zes
velden. Illustratief; geen echte klant. Toont dat de **scène** de keuze en de stijl
draagt — niet de branche.

## Ingevulde discovery (fictief)

- **KLANTNAAM:** Meridian Motors
- **ELEVATOR PITCH:** Een elektrische sportwagen die stilte en kracht verenigt.
- **HOOFDDOEL:** Proefritten boeken.
- **SFEER:** Rustig, cinematisch, exclusief.
- **FILM SCENE:** "Een verlaten bergweg net na zonsondergang, de laatste gloed op de auto."
- **WOW-FACTOR:** Een full-screen hero die als een filmshot opent.
- **UNIEKE BEWIJSVOERING:** 0–100 in 3,2 s; 617 pk; 480 km bereik.

## Templatekeuze

- **Dominante vorm:** één overweldigend beeld, tekst is bijzaak → **`hero-immersive`**.
- **Afgewezen runner-up:** `product-first` (te veel nadruk op specificaties; de scène
  vraagt om beeld-eerst).
- **Waarom de scène deze vorm draagt:** de bergweg-na-zonsondergang is een filmshot; het
  hero-immersive skelet laat dat beeld domineren, met de claims als rustige reveal.

## Mapping naar de zes velden (`projects/<client>/brief.md`)

| Veld | Waarde |
|---|---|
| `klantnaam` | Meridian Motors |
| `one thing` | Stilte en kracht in één elektrische sportwagen |
| `scene` | Verlaten bergweg net na zonsondergang, laatste gloed op de auto |
| `proof` | 0–100 in 3,2 s · 617 pk · 480 km bereik |
| `assets` | hero-clip (bergweg), 2 detailbeelden (interieur, aandrijflijn), gradiënt-SVG, logo-SVG — scene-afgeleid, geen stock |
| `CTA` | "Boek een proefrit" |

## Stijl uit de scène (niet uit de branche)

- **Palet/licht:** afgeleid van "laatste gloed na zonsondergang" — diep blauw-grijs met een
  warme goud-amber gloed. Niet gekozen omdat het "een auto-site" is.
- **Motion:** trage hero-zoom (1.05→1.0) met `--ease-out`, reveal-fade met stagger 40 ms,
  `prefers-reduced-motion` toont alles direct. Transform/opacity-only.

## Bewijs

Daadwerkelijke build gebeurt in `apps/meridian-motors-site/` (kopie van `apps/_template-site`),
gevolgd door `npm run check` en echte evidence in `delivery.md`. Dit bestand is alleen het
voorbeeld van de discovery→template→mapping-stap.
