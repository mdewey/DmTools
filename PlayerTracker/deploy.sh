dotnet publish -c Release 

cp dockerfile ./bin/release/netcoreapp2.2/publish

docker build -t sdg-player-tracker-image ./bin/release/netcoreapp2.2/publish

docker tag sdg-player-tracker-image registry.heroku.com/sdg-player-tracker/web

docker push registry.heroku.com/sdg-player-tracker/web

heroku container:release web -a sdg-player-tracker

# sudo chmod 755 deploy.sh
# ./deploy.sh  