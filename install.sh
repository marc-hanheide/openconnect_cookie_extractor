#!/usr/bin/env bash
cd "$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
DESKTOP_FILE="cookieextractor-openconnect.desktop"
HANDLER_PROTOCOL="openconnectcookieextractor"

# Create desktop entry for x-scheme-handler
echo "[Desktop Entry]
Version=1.0
Type=Application
Exec=/bin/bash -c 'cmd=%u;cmd=\${cmd#*://};cmd=\"\${cmd//#/ }\";cmd=\"sudo openconnect \$cmd\";echo Running \$cmd;\$cmd'
StartupNotify=true
Terminal=true
Categories=System
MimeType=x-scheme-handler/${HANDLER_PROTOCOL}
Name=cookieextractor-openconnect
Comment=Launch OpenConnect with Cookie from ${HANDLER_PROTOCOL}
" > "$HOME/.local/share/applications/${DESKTOP_FILE}"
chmod +x "$HOME/.local/share/applications/${DESKTOP_FILE}"

xdg-mime install --mode user ${DESKTOP_FILE}
xdg-mime default ${DESKTOP_FILE} x-scheme-handler/${HANDLER_PROTOCOL}
#xdg-mime query default x-scheme-handler/${HANDLER_PROTOCOL}
update-desktop-database "$HOME/.local/share/applications"