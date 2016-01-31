'use strict';

angular.module('louvorShow.version', [
  'louvorShow.version.interpolate-filter',
  'louvorShow.version.version-directive'
])

.value('version', '0.1');
