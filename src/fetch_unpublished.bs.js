#!/usr/bin/env node
'use strict';

var Fs          = require("fs");
var Path        = require("path");
var Curry       = require("bs-platform/lib/js/curry.js");
var Utils       = require("./common/Utils.bs.js");
var Config      = require("./common/Config.bs.js");
var Rebase      = require("@glennsl/rebase/src/Rebase.bs.js");
var Resync      = require("refetch/src/Resync.js");
var Source      = require("./common/Source.bs.js");
var Package     = require("./common/Package.bs.js");
var Manifest    = require("./common/Manifest.bs.js");
var Repository  = require("./common/Repository.bs.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.js");

require('isomorphic-fetch')
;

function getSources() {
  return Json_decode.field("unpublished", Source.Decode[/* collection */3](Source.Unpublished[/* fromJson */0]), JSON.parse(Fs.readFileSync(Config.sourcesFile, "ascii")));
}

Rebase.List[/* forEach */8]((function (source) {
        var repo = source[/* repository */1];
        return Resync.Future[/* whenCompleted */6]((function (param) {
                      if (param.tag) {
                        console.log("\n", repo, "\n", param[0]);
                        return /* () */0;
                      } else {
                        return /* () */0;
                      }
                    }), Utils.Future[/* >>= */0](Manifest.get(repo), (function (manifest) {
                          return Utils.Future[/* >>= */0](Repository.getReadme(repo), (function (readme) {
                                        return Utils.Future[/* >>= */0](Repository.getStats(repo), (function (stats) {
                                                      var json = JSON.stringify(Package.fromUnpublished(repo, manifest, readme, stats));
                                                      var path = Path.join(Config.packageDir, "unpublished", encodeURIComponent(Repository.makeId(repo)) + ".json");
                                                      return Curry._1(Utils.Future[/* return */1], Utils.Fs[/* writeFile */2](path, json));
                                                    }));
                                      }));
                        })));
      }), getSources(/* () */0));

exports.getSources = getSources;
/*  Not a pure module */
