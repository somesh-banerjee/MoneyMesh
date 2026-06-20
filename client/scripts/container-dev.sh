#!/bin/sh
# Dev startup for Podman/Linux containers on Apple Silicon.
# npm/cli#4828: a macOS package-lock.json skips Linux optional native modules.
set -e
cd /usr/src/app

MARKER=node_modules/.container-deps-ok

clear_node_modules() {
  # node_modules is a Podman volume mount — cannot rm the directory itself
  if [ -d node_modules ]; then
    find node_modules -mindepth 1 -delete
  else
    mkdir -p node_modules
  fi
}

pkg_version() {
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('node_modules/$1/package.json', 'utf8'));
    process.stdout.write(pkg.version);
  "
}

install_linux_native_modules() {
  ROLLUP_VERSION="$(pkg_version rollup)"
  LIGHTNINGCSS_VERSION="$(pkg_version lightningcss)"
  OXIDE_VERSION="$(pkg_version @tailwindcss/oxide)"
  ESBUILD_VERSION="$(pkg_version esbuild)"

  npm install \
    "@rollup/rollup-linux-arm64-gnu@${ROLLUP_VERSION}" \
    "lightningcss-linux-arm64-gnu@${LIGHTNINGCSS_VERSION}" \
    "@tailwindcss/oxide-linux-arm64-gnu@${OXIDE_VERSION}" \
    "@esbuild/linux-arm64@${ESBUILD_VERSION}" \
    --no-save --include=optional 2>/dev/null \
    || npm install \
      "@rollup/rollup-linux-arm64-musl@${ROLLUP_VERSION}" \
      "lightningcss-linux-arm64-musl@${LIGHTNINGCSS_VERSION}" \
      "@tailwindcss/oxide-linux-arm64-musl@${OXIDE_VERSION}" \
      "@esbuild/linux-arm64@${ESBUILD_VERSION}" \
      --no-save --include=optional
}

native_modules_ok() {
  node -e "
    require('@rollup/rollup-linux-arm64-gnu');
    require('lightningcss');
    require('@tailwindcss/oxide-linux-arm64-gnu');
    require('esbuild');
  " 2>/dev/null \
    || node -e "
    require('@rollup/rollup-linux-arm64-musl');
    require('lightningcss');
    require('@tailwindcss/oxide-linux-arm64-musl');
    require('esbuild');
  " 2>/dev/null
}

needs_install() {
  [ ! -f "$MARKER" ] && return 0
  [ package.json -nt "$MARKER" ] && return 0
  native_modules_ok && return 1 || return 0
}

if needs_install; then
  echo "Installing frontend dependencies for Linux container..."
  clear_node_modules
  npm install --include=optional --no-package-lock
  install_linux_native_modules
  touch "$MARKER"
else
  echo "Frontend dependencies OK, skipping install."
fi

echo "Starting Vite..."
exec npm run dev -- --host 0.0.0.0 --port 5173
