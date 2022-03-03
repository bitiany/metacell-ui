#/bin/sh

rm -rf ./build
yarn run build
tar cvf metacell-ui.tar ./build/
ssh bitiany.com "rm -rf /workspaces/html/metacell-ui*"
scp ./metacell-ui.tar root@bitiany.com:/workspaces/html/
ssh bitiany.com "cd /workspaces/html/  && tar -xvf metacell-ui.tar && mv build/ metacell-ui"
ssh bitiany.com "rm -rf /workspaces/html/metacell-ui.tar"
ssh bitiany.com "openresty -s reload"
rm -rf metacell-ui.tar





