1700  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
1701  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
1703  source ~/.bashrc
1704  nvm install --lts
1705  nvm use --lts
1706  node -v
1707  npm -v
1708  rm -r bunjang-fe/
1709  npx create-react-app fe
1715  cd fe
1716  ls
1717  npm start