from pathlib import Path
import subprocess
import tempfile
import sys

ROOT = Path(__file__).resolve().parents[1]
probe = ROOT / 'src' / 'WHS_Probe.jsx'
text = probe.read_text(encoding='utf-8')

lines = text.splitlines()
body = '\n'.join(lines[1:] if lines and lines[0].startswith('#target') else lines) + '\n'
with tempfile.NamedTemporaryFile('w', suffix='.js', encoding='utf-8', delete=False) as tmp:
    tmp.write(body)
    tmp_path = tmp.name
subprocess.run(['node', '--check', tmp_path], check=True)

# The probe must never change the project or write files.
forbidden = [
    '.save(', '.saveWithDialog(', 'app.open(', '.close(', '.importFile(', '.setValue(',
    '.addComp(', '.addSolid(', '.addText(', 'app.beginUndoGroup', '.remove()',
    '.open("w")', ".open('w')", '.write(', '.writeln(' + '"w"',
]
found = [t for t in forbidden if t in text]
assert not found, f'forbidden tokens in probe: {found}'

assert '// <WHS_CORE>' in text and '// </WHS_CORE>' in text, 'core markers missing'
core = text.split('// <WHS_CORE>')[1].split('// </WHS_CORE>')[0]
assert 'app.' not in core and 'File(' not in core and 'Folder(' not in core, 'core must be host-independent'

# ExtendScript is ES3: no let/const/arrow functions in the probe.
for bad in ['let ', 'const ', '=>', '`']:
    assert bad not in text, f'ES3-incompatible token in probe: {bad!r}'


# The UI must be a ScriptUI panel (dockable when installed), not a modal alert.
assert 'instanceof Panel' in text, 'probe must support running as a docked ScriptUI Panel'
assert 'new Window("palette"' in text, 'probe must fall back to a floating palette'
assert 'alert(' not in text and 'confirm(' not in text, 'no modal dialogs in the panel'

# The script must stay pure ASCII (Japanese is written as escapes by scripts/gen_i18n.py) so
# After Effects reads it correctly whatever encoding it assumes for the file.
non_ascii = sorted(set(c for c in text if ord(c) > 127))
assert not non_ascii, f'non-ASCII characters in the script: {non_ascii[:10]}'

print('static checks ok')
sys.exit(0)
