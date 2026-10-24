#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# Mi Llano Grill Carne En Vara — Static Deployment Script
# Target Host: HestiaCP (38.49.218.214) -> mi-llano-grill.aviaorlando.com
# ==============================================================================

REMOTE_HOST="root@38.49.218.214"
HESTIA_USER="kvtjfIhctlu"
DOMAIN="mi-llano-grill.aviaorlando.com"
REMOTE_WEB_DIR="/home/${HESTIA_USER}/web/${DOMAIN}/public_html"

echo "==> Syncing Mi Llano Grill static site to ${REMOTE_HOST}:${REMOTE_WEB_DIR}..."
rsync -avz --delete \
  --exclude '.git' \
  --exclude '.DS_Store' \
  --exclude 'deploy.sh' \
  ./ "${REMOTE_HOST}:${REMOTE_WEB_DIR}/"

ssh "${REMOTE_HOST}" "chown -R ${HESTIA_USER}:${HESTIA_USER} ${REMOTE_WEB_DIR} && find ${REMOTE_WEB_DIR} -type d -exec chmod 755 {} + && find ${REMOTE_WEB_DIR} -type f -exec chmod 644 {} +"
echo "==> Live at https://${DOMAIN}"
