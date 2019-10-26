docker build -t dewseph-dm-tools-image .
docker tag dewseph-dm-tools-image registry.heroku.com/dewseph-dm-tools/web
docker push registry.heroku.com/dewseph-dm-tools/web
heroku container:release web -a dewseph-dm-tools