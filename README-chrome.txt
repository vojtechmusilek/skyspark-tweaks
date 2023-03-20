Many small features for better user experience in SkySpark.

Customizable features using extension settings.

**Features**

Code editor:
- Functions camelCase coloring
- Opened functions history
- Preserving editor search after refresh
- Matching do-end in code
- Matching text in code
- CodeMirror property color
- CodeMirror bold bracket

Split view navbar buttons (SkySpark 3.1+):
- Extend right
- Extend left
- Reset size
- Swap sides

Other:
- Favorite apps in home view
- Faster project picker (SkySpark 3.1+)



**Versions**

2.0.1:
- Added faster project picker with autofocus and realtime fuzzy search
  (disabled by default, can be enabled in settings)
- Added version number to settings popup
- Changed text matching to not match if and else
- Fixed Editor not coloring functions in edge case
- Fixed Editor text search preserving when hashing is not available
- Fixed Editor text search hiding functions that should be visible
- Fixed Editor coloring to only color Editor funcs and not docs functions
- Fixed Editor history to only work in Editor funcs and not docs functions

2.0.0:
- Rebuilt with performance in mind from the ground up
- Added Chrome icon popup for managing settings
- Added more settings options
- Added option to preserve Editor search text after browser refresh
- Added Editor text matching
- Added navbar buttons for Split View
- Improved settings to save using Chrome Sync
- Improved Editor history to not repeat functions

1.4.0:
- Legacy version