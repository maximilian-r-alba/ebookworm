set -o errexit


bundle install
RAILS_ENV=production rake db:drop DISABLE_DATABASE_ENVIRONMENT_CHECK=1 
# bundle exec rake assets:precompile # These lines are commented out because we have an API only app
# bundle exec rake assets:clean
bundle exec rake db:migrate



rm -rf public
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

# bundle exec rake db:seed