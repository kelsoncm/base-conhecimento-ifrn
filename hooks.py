"""Hook do MkDocs para copiar CONTRIBUTING.md e SECURITY.md para a pasta docs/ antes do build se houver alterações."""
from pathlib import Path
import filecmp
import shutil


def _copy_if_changed(src: Path, dst: Path):
    if not dst.exists() or not filecmp.cmp(src, dst, shallow=False):
        shutil.copyfile(src, dst)


def on_pre_build(config, **kwargs):
    root = Path(__file__).resolve().parent
    docs = root / "docs"
    docs.mkdir(parents=True, exist_ok=True)
    _copy_if_changed(root / "CONTRIBUTING.md", docs / "contribuindo.md")
    _copy_if_changed(root / "SECURITY.md", docs / "seguranca.md")
