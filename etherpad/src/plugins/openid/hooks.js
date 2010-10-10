import("etherpad.log");
import("plugins.openid.controllers.openidController");
import("dispatch.{Dispatcher,PrefixMatcher,forward}");
function handlePath(){
  return [[PrefixMatcher('/ep/openid/'), forward(openidController)]];
}