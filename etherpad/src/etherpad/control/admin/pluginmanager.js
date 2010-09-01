/**
 * Copyright 2009 RedHog, Egil Möller <egil.moller@piratpartiet.se>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import("faststatic");
import("dispatch.{Dispatcher,PrefixMatcher,forward}");

import("etherpad.utils.*");
import("etherpad.collab.server_utils");
import("etherpad.globals.*");
import("etherpad.log");
import("etherpad.pad.padusers");
import("etherpad.pro.pro_utils");
import("etherpad.helpers");
import("etherpad.pro.pro_accounts.getSessionProAccount");
import("etherpad.admin.plugins");
import("etherpad.pad.padutils");

function onRequest() {  
  if (request.params.action == 'install') {
   plugins.enablePlugin(request.params.plugin);
  } else if (request.params.action == 'uninstall') {
   plugins.disablePlugin(request.params.plugin);
  } else if (request.params.action == 'reinstall') {
   plugins.disablePlugin(request.params.plugin);
   plugins.loadPlugins(1);
   plugins.enablePlugin(request.params.plugin);
  }

  helpers.addClientVars({
   userAgent: request.headers["User-Agent"],
   debugEnabled: request.params.djs,
   clientIp: request.clientAddr,
   colorPalette: COLOR_PALETTE,
   serverTimestamp: +(new Date),
   isProPad: pro_utils.isProDomainRequest(),
   userIsGuest: padusers.isGuest(padusers.getUserId()),
   userId: padusers.getUserId(),
  });


  padutils.setOptsAndCookiePrefs(request);
  var prefs = helpers.getClientVar('cookiePrefsToSet');
  var bodyClass = (prefs.isFullWidth ? "fullwidth" : "limwidth")

  renderHtml("admin/pluginmanager.ejs",
   {
    prefs: prefs,
    config: appjet.config,
    bodyClass: 'nonpropad',
    isPro: pro_utils.isProDomainRequest(),
    isProAccountHolder: pro_utils.isProDomainRequest() && ! padusers.isGuest(padusers.getUserId()),
    account: getSessionProAccount(), // may be falsy
   });
  return true;
}
