const merge = require('lodash/merge');

const featureToggle = {
  data: {},
  assumeEnabledByDefault: true,
  /**
   * Allowing resolving of nested rules as allows you to lock / unlock a group
   * of features behind a group flag. Please use this option with great care
   * as it can lead to false-possitives in cases when you expect to only disable
   * functionality by flags - checking for a nested val can return different
   * value than expected.
   */
  resolveNested: true,
  resolveNestedTo: function() {
    return this.assumeEnabledByDefault
  },

  set: function(data) {
    merge(this.data, data);
  },

  reset: function() {
    this.data = {};
  },

  isDisabled: function(key) {
    return !this.isEnabled(key)
  },

  isEnabled: function(key) {
    try {
      // transform the dot string-dot notation to an object selector
      const value = key.split('.').reduce((o, i) => o[i], this.data);
      if(typeof value == "undefined") throw(new Exception("Key " + key + " not defined"));
      else if(typeof value == "function") {
        const args = Object.values(arguments).slice(1);
        return value.apply(this, args);
      }
      else if(typeof value == "object" && this.resolveNested === true) {
        return this.resolveNestedTo();
      }
      return value;
    }
    catch(exception) {
      return this.assumeEnabledByDefault;
    }
  }
};

module.exports = featureToggle;
