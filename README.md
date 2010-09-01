# PLEASE DO NOT MERGE THIS CODE BASE WITH THE ETHERPAD TRUNK!
It is very much a work-in-progress and I'm pushing changes up here for my own use until I can get a few major features implemented.
There are a couple of core hacks that will take me a while to do properly. Before I address these I want to get the basic features I want in place.

#Roadmap
I have a different set of priorities to the etherpad core team. The features I am working on now are:
 1. Hierarchical document management
 2. OpenID-based authentication
 3. RSS of document history
 4. Search
 5. A graphic redesign (see the 'ubuntu' template for progress - you will need to have my plugins switched on for this to display correctly though.)
 6. Syntax highlighting for a use-case documentation syntax we are developing.

If you are interested, here is the main mockup I'm working to: http://people.canonical.com/~michaelforrest/specs/ubuntu_spec_editor/spec-editor.png

There will be various ways of navigating content as a non-editor that I have yet to create mockups for. 

It starts with something like this: http://people.canonical.com/~michaelforrest/specs/ubuntu_spec_editor/spec-viewer.png

Thank you - I hope I can play well as a downstream and will do my best to encapsulate the functionality with the broadest appeal in plugins. However, sometimes the reengineering will be more significant so to keep it out of the core is initially impractical. 

# About Etherpad
EtherPad is a web-based realtime collaborative document editor.

EtherPad currently lives at <http://etherpad.org>

For instructions to build and run EtherPad, see: <http://doc.etherpad.org/ep/tag/?query=installation>
