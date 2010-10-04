import("etherpad.log");
import("plugins.openid.controllers.openidController");
import("dispatch.{Dispatcher,PrefixMatcher,forward}");
function handlePath(){
  log.info("handling path in  OPENID!");
  return [[PrefixMatcher('/ep/openid/'), forward(openidController)]];
}