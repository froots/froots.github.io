source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', '= 191'
group :jekyll_plugins do
  gem 'jekyll-paginate'
end
