jsx --no-cache-dir -ex jsx ./public/react/app ./public/react/build \
&& \
cat \
./public/react/app/appconfig.js \
./public/react/app/appfirebase.js \
./public/react/app/appevent.js \
./public/react/app/dispatcher.js \
./public/react/app/model/ModelEntry.js \
./public/react/app/controller/ControllerEntry.js \
./public/react/build/component/* \
./public/react/build/js.js \
| sed -r 's/[\t\r\n]+//' | sed -r 's/ [ ]+//' | tr '\n' ' ' > ./public/react/min.js