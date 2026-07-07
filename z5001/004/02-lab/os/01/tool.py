#!/usr/bin/env python3

import argparse
import platform
import shutil
import subprocess
from pathlib import Path


# -------------------------
# backup
# -------------------------
def backup_command(args):
    source = Path(args.source)
    destination = Path(args.destination)

    if not source.exists():
        print("Source does not exist.")
        return

    destination.mkdir(parents=True, exist_ok=True)

    if source.is_file():
        shutil.copy2(source, destination)
    else:
        shutil.copytree(
            source,
            destination / source.name,
            dirs_exist_ok=True
        )
    if args.verbose:
        print("Verbose Mode ON")
    print("Backup completed.")


# -------------------------
# ping
# -------------------------
def ping_command(args):
    count = args.count
    if platform.system() == "Windows":
        cmd = ["ping", "-n", str(count), args.host]
    else:
        cmd = ["ping", "-c", str(count), args.host]
    subprocess.run(cmd)

# -------------------------
# cleanup
# -------------------------
def cleanup_command(args):
    folder = Path(args.path)
    if not folder.exists():
        print("Folder not found.")
        return
    extension = args.extension
    total = 0
    for file in folder.rglob(f"*{extension}"):
        if args.dry_run:
            print("Would remove:", file)
        else:
            file.unlink()
            print("Removed:", file)
        total += 1
    print(f"Total files: {total}")


# -------------------------
# info
# -------------------------
def info_command(args):
    print("System :", platform.system())
    print("Release:", platform.release())
    print("Python :", platform.python_version())
    if args.verbose:
        print("Machine :", platform.machine())
        print("Processor:", platform.processor())


# ==========================================================
# Main
# ==========================================================
parser = argparse.ArgumentParser(
    prog="tool.py",
    description="Professional CLI Utility Example"
)
parser.add_argument(
    "--version",
    action="version",
    version="Tool Version 1.0"
)
subparsers = parser.add_subparsers(
    title="commands",
    dest="command",
    required=True
)

# ==========================================================
# backup
# ==========================================================
backup = subparsers.add_parser(
    "backup",
    help="Backup files or folders"
)
backup.add_argument(
    "source",
    help="Source file/folder"
)
backup.add_argument(
    "destination",
    help="Backup destination"
)
backup.add_argument(
    "-v",
    "--verbose",
    action="store_true",
    help="Verbose output"
)
backup.set_defaults(func=backup_command)

# ==========================================================
# ping
# ==========================================================
ping = subparsers.add_parser(
    "ping",
    help="Ping a host"
)
ping.add_argument(
    "host",
    help="Hostname or IP"
)
ping.add_argument(
    "-c",
    "--count",
    type=int,
    default=4,
    help="Number of packets (default=4)"
)
ping.set_defaults(func=ping_command)

# ==========================================================
# cleanup
# ==========================================================
cleanup = subparsers.add_parser(
    "cleanup",
    help="Delete unwanted files"
)
cleanup.add_argument(
    "path",
    help="Folder to clean"
)
cleanup.add_argument(
    "-e",
    "--extension",
    choices=[".tmp", ".log", ".bak"],
    default=".tmp",
    help="File extension"
)
cleanup.add_argument(
    "--dry-run",
    action="store_true",
    help="Show files without deleting"
)
cleanup.set_defaults(func=cleanup_command)

# ==========================================================
# info
# ==========================================================
info = subparsers.add_parser(
    "info",
    help="Show system information"
)
info.add_argument(
    "-v",
    "--verbose",
    action="store_true",
    help="Detailed information"
)
info.set_defaults(func=info_command)

# ==========================================================
# upload
# (Demonstrates required optional argument)
# ==========================================================
upload = subparsers.add_parser(
    "upload",
    help="Upload a file"
)
upload.add_argument(
    "file",
    help="File to upload"
)
upload.add_argument(
    "--server",
    required=True,
    help="Server URL"
)
upload.add_argument(
    "--user",
    required=True,
    help="Username"
)
upload.add_argument(
    "--secure",
    action="store_true",
    help="Use HTTPS"
)

def upload_command(args):
    print("Uploading:", args.file)
    print("Server   :", args.server)
    print("User     :", args.user)
    print("Secure   :", args.secure)

upload.set_defaults(func=upload_command)

# ==========================================================
# Parse
# ==========================================================
args = parser.parse_args()
args.func(args)