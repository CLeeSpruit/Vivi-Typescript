#!/usr/bin/env bash

echo "Switching to master branch and grabbing latest..."
git checkout master
git pull

echo "Is this a major, minor, or patch update?"
select update in "major" "minor" "patch";
do
    npm version $update
    break
done

echo "Publishing..."
npm publish --scope=public

echo "Publish complete!"