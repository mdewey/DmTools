nvm use 8

dotnet publish -c Release 

cp dockerfile ./bin/release/netcoreapp2.1/publish

docker build -t dd-player-init-tracker-image ./bin/release/netcoreapp2.1/publish

docker tag dd-player-init-tracker-image registry.heroku.com/dd-init-tracker/web

docker push registry.heroku.com/dd-init-tracker/web

heroku container:release web -a dd-init-tracker

# sudo chmod 755 deploy.sh
# ./deploy.sh%    