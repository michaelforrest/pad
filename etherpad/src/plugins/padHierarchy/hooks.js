import("etherpad.log");
import("sqlbase.sqlbase");
import("plugins.padHierarchy.controllers.hierarchyController");
import("dispatch.{Dispatcher,PrefixMatcher,forward}");


function handlePath() {
  return [
  	['/', hierarchyController.render_main],
  	['/ep/update_pad_meta', hierarchyController.update_pad_meta ],
    [/^\/([^\/]+)$/, hierarchyController.redirect_to_pads_path], // supercede  [/^\/([^\/]+)$/, pad_control.render_pad],
	[/^\/pads(.*)\/\+edit$/, hierarchyController.edit_page],
	[/^\/pads.*/, forward(hierarchyController)]
  
  ];
}