"""Hook do MkDocs para copiar CONTRIBUTING.md e SECURITY.md para a pasta docs/ antes do build."""
from pathlib import Path
import shutil


def on_pre_build(config, **kwargs):
    root = Path(__file__).resolve().parent
    docs = root / "docs"
    docs.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(root / "CONTRIBUTING.md", docs / "contribuindo.md")
    shutil.copyfile(root / "SECURITY.md", docs / "seguranca.md")
