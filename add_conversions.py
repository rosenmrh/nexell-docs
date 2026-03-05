#!/usr/bin/env python3
"""
Añade conversion tracking de Google Ads a todos los HTML de nexelldox.com
- Form conversion: AW-17992598707/ALwKCOypjIMcELOJxYND
- Call conversion: AW-17992598707/6Y-BCO-pjIMcELOJxYND
"""
import glob, re

CONVERSION_SNIPPET = """<!-- Google Ads Conversion Tracking -->
<script>
function ndx_track_form(){gtag('event','conversion',{'send_to':'AW-17992598707/ALwKCOypjIMcELOJxYND','value':350.0,'currency':'EUR'});}
function ndx_track_call(){gtag('event','conversion',{'send_to':'AW-17992598707/6Y-BCO-pjIMcELOJxYND','value':1.0,'currency':'EUR'});}
document.addEventListener('click',function(e){var l=e.target.closest('a[href^="tel:"]');if(l)ndx_track_call();});
</script>"""

GTAG_CONFIG_LINE = "gtag('config', 'AW-17992598707');"

files = glob.glob('/private/tmp/nexell-docs/*.html')
updated = []
skipped = []

for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()

    # Skip if already has conversion tracking
    if 'ndx_track_form' in content:
        skipped.append(f.split('/')[-1])
        continue

    # Insert conversion snippet after the </script> that closes the gtag config block
    if GTAG_CONFIG_LINE in content:
        # Use regex to match the closing </script> after gtag config, with any whitespace
        new_content = re.sub(
            r"(gtag\('config', 'AW-17992598707'\);\s*</script>)",
            r"\1\n" + CONVERSION_SNIPPET,
            content
        )

        # For index.html: also add form conversion tracking in the fetch success handler
        if 'index.html' in f:
            # Add ndx_track_form() call after successful form submission
            new_content = new_content.replace(
                ".then(r => {\n            btn.textContent = '✓ Solicitud enviada correctamente';",
                ".then(r => {\n            ndx_track_form();\n            btn.textContent = '✓ Solicitud enviada correctamente';"
            )

        if new_content != content:
            with open(f, 'w', encoding='utf-8') as fh:
                fh.write(new_content)
            updated.append(f.split('/')[-1])
        else:
            skipped.append(f.split('/')[-1] + ' (no changes)')
    else:
        skipped.append(f.split('/')[-1] + ' (no gtag found)')

print(f"\n✅ UPDATED ({len(updated)} files):")
for u in sorted(updated):
    print(f"   {u}")

if skipped:
    print(f"\n⏭️  SKIPPED ({len(skipped)} files):")
    for s in sorted(skipped):
        print(f"   {s}")

print(f"\nConversion labels:")
print(f"  Form: AW-17992598707/ALwKCOypjIMcELOJxYND (€350)")
print(f"  Call:  AW-17992598707/6Y-BCO-pjIMcELOJxYND (€1)")
